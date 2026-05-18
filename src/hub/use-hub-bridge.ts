/**
 * Hub bridge — syncs canvas-side incoming resources into the embed
 * editor's assets panel.
 *
 * Direction is one-way (canvas → embed). When the user wires another
 * canvas node into the file-node hosting this embed iframe, that
 * resource shows up under `hub.canvas.getIncomingResources()`. We
 * fetch its bytes from the gateway, run them through the same
 * processing pipeline drag-and-drop / paste use, and add a `MediaAsset`
 * to the active project. When the connection is removed, we delete the
 * corresponding asset.
 *
 * Reconciliation policy:
 *  - We persist a `resourceNodeId → opencutAssetId` map in `hub.storage`
 *    (per-node KV, lives in canvas.json). This survives iframe reloads
 *    so we don't double-import on every refresh.
 *  - On each reconcile pass we diff incoming-resources × the persisted
 *    map × the current `editor.media.getAssets()` set, then apply the
 *    delta. Entries whose opencut asset was deleted by the user (via
 *    the assets panel UI) get pruned from the map so the next change
 *    event treats the resource as "new" and re-imports it.
 *  - Only `image | video | audio` resources are imported — opencut's
 *    media panel doesn't model `text` or generic `file`.
 *
 * Mutex policy: `incoming` events from the host can fire rapidly (any
 * graph change triggers one). Each reconcile pass involves async
 * network + processing work; if a second event fires mid-pass we
 * could end up double-importing a resource. We guard the body with an
 * `inFlight` flag and a `pending` re-run bit — at most one reconcile
 * runs at a time, and the latest queued one always coalesces.
 */

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
	AddMediaAssetCommand,
	RemoveMediaAssetCommand,
	BatchCommand,
} from "@/commands";
import type { EditorCore } from "@/core";
import { useEditor } from "@/editor/use-editor";
import { processMediaAssets } from "@/media/processing";
import type { HubResource } from "@/hub/sdk-types";
import { isHubAvailable } from "@/hub/sdk-types";
import { fetchHubResourceAsFile } from "@/hub/pick-asset";

/**
 * `hub.storage` key for the mapping. Per-node scope means each plugin
 * file-node on the canvas keeps its own map; collisions across nodes
 * are impossible by construction.
 */
const STORAGE_KEY = "opencut-embed:incomingMap";

type IncomingMap = Record<string, string>;

/** Resources that opencut's media panel can actually represent. */
function isImportableResource(
	resource: HubResource,
): resource is HubResource & { type: "image" | "video" | "audio" } {
	return (
		resource.type === "image" ||
		resource.type === "video" ||
		resource.type === "audio"
	);
}

export function useHubBridge(): void {
	const editor = useEditor();
	const activeProjectId = useEditor(
		(e) => e.project.getActiveOrNull()?.metadata.id ?? null,
	);

	// Reconcile state — refs because the reconcile loop is stable across
	// React renders and we don't want a re-render to trigger another
	// pass. `mapRef` is the source-of-truth in-memory copy of the
	// persisted mapping; it's mutated in place and then flushed to
	// `hub.storage` after a successful pass.
	const mapRef = useRef<IncomingMap>({});
	const inFlightRef = useRef(false);
	const pendingRef = useRef(false);
	const cancelledRef = useRef(false);

	useEffect(() => {
		if (!isHubAvailable()) return;
		if (!activeProjectId) return;
		const hub = window.hub!;
		cancelledRef.current = false;

		const reconcile = async (): Promise<void> => {
			if (inFlightRef.current) {
				pendingRef.current = true;
				return;
			}
			inFlightRef.current = true;
			try {
				await runReconcile({
					hub,
					mapRef,
					projectId: activeProjectId,
					editor,
					cancelledRef,
				});
			} catch (error) {
				console.error("[hub-bridge] reconcile failed", error);
			} finally {
				inFlightRef.current = false;
				if (pendingRef.current && !cancelledRef.current) {
					pendingRef.current = false;
					void reconcile();
				}
			}
		};

		let unsubscribe: (() => void) | null = null;
		(async () => {
			try {
				await hub.ready;
			} catch (error) {
				console.warn("[hub-bridge] hub.ready rejected", error);
				return;
			}
			if (cancelledRef.current) return;
			try {
				const stored = await hub.storage.get<IncomingMap>(STORAGE_KEY);
				if (stored && typeof stored === "object") {
					mapRef.current = { ...stored };
				}
			} catch (error) {
				console.warn("[hub-bridge] storage.get failed", error);
			}
			if (cancelledRef.current) return;
			unsubscribe = hub.canvas.onIncomingChange(() => {
				void reconcile();
			});
			void reconcile();
		})();

		return () => {
			cancelledRef.current = true;
			if (unsubscribe) unsubscribe();
		};
	}, [editor, activeProjectId]);
}

/**
 * One pass of the diff loop. Pure-ish — mutates `mapRef.current` and
 * `editor.media`, but does not touch React state directly. Split out
 * from the hook body so it can read cleanly without nesting.
 */
async function runReconcile({
	hub,
	mapRef,
	projectId,
	editor,
	cancelledRef,
}: {
	hub: NonNullable<typeof window.hub>;
	mapRef: { current: IncomingMap };
	projectId: string;
	editor: EditorCore;
	cancelledRef: { current: boolean };
}): Promise<void> {
	const incoming = await hub.canvas.getIncomingResources({
		type: ["image", "video", "audio"],
	});
	if (cancelledRef.current) return;

	const existingAssetIds = new Set(editor.media.getAssets().map((a) => a.id));
	const map = { ...mapRef.current };
	const incomingByNodeId = new Map<string, HubResource>();
	for (const resource of incoming) {
		if (!isImportableResource(resource)) continue;
		incomingByNodeId.set(resource.nodeId, resource);
	}

	// 1) Prune mapping entries whose opencut asset was deleted by the
	// user (e.g. via the assets panel context menu) so the next pass
	// treats the still-connected resource as new and re-imports it.
	for (const [resourceNodeId, opencutAssetId] of Object.entries(map)) {
		if (!existingAssetIds.has(opencutAssetId)) {
			delete map[resourceNodeId];
		}
	}

	// 2) Compute add / remove deltas.
	const toAdd: HubResource[] = [];
	for (const resource of incomingByNodeId.values()) {
		if (!map[resource.nodeId]) toAdd.push(resource);
	}
	const toRemove: string[] = [];
	for (const resourceNodeId of Object.keys(map)) {
		if (!incomingByNodeId.has(resourceNodeId)) {
			toRemove.push(resourceNodeId);
		}
	}

	// 3) Apply removals first — small, synchronous, no network. The
	// remove command also tears down timeline elements that referenced
	// the asset, which is the behaviour we want when a connection is
	// pulled out.
	if (toRemove.length > 0) {
		const removeCommands = toRemove
			.map((resourceNodeId) => {
				const opencutAssetId = map[resourceNodeId];
				delete map[resourceNodeId];
				return existingAssetIds.has(opencutAssetId)
					? new RemoveMediaAssetCommand({
							projectId,
							assetId: opencutAssetId,
						})
					: null;
			})
			.filter((c): c is RemoveMediaAssetCommand => c !== null);
		if (removeCommands.length > 0) {
			const command =
				removeCommands.length === 1
					? removeCommands[0]
					: new BatchCommand(removeCommands);
			editor.command.execute({ command });
		}
	}

	// 4) Apply additions. We fetch + process serially per resource so a
	// single failure doesn't poison the whole batch and so storage
	// quotas (`storageService.canStoreFile`) can be re-checked as we
	// grow. processMediaAssets itself already toasts per-file errors.
	for (const resource of toAdd) {
		if (cancelledRef.current) return;
		try {
			const file = await fetchHubResourceAsFile(resource);
			const [processed] = await processMediaAssets({ files: [file] });
			if (!processed) {
				// processMediaAssets toasted (unsupported MIME, quota, …).
				continue;
			}
			const addCommand = new AddMediaAssetCommand({
				projectId,
				asset: processed,
			});
			editor.command.execute({ command: addCommand });
			map[resource.nodeId] = addCommand.getAssetId();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "unknown error";
			console.error("[hub-bridge] failed to import resource", resource, error);
			toast.error(`Couldn't import ${resource.name}`, {
				description: message,
			});
		}
	}

	mapRef.current = map;

	// 5) Flush the mapping back to per-node storage. Best-effort: a
	// storage failure logs but doesn't roll back the import — the worst
	// case on a missed flush is a double-import on next refresh, which
	// the prune step in (1) can't fix because there's no record. Quota
	// is generous for this shape (one entry per connected resource).
	try {
		await hub.storage.set(STORAGE_KEY, map);
	} catch (error) {
		console.warn("[hub-bridge] storage.set failed", error);
	}
}
