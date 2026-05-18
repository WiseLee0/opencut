/**
 * Hub asset picker helper — opens the host's modal asset dialog and
 * downloads each picked resource into a `File` so it can flow through
 * the same processing pipeline as drag-and-drop / the local file
 * picker (`processMediaAssets` → `editor.media.addMediaAsset`).
 *
 * Lives in `src/hub/` because the gateway-side `window.hub.canvas.pickAsset`
 * RPC is the canonical entry-point for "pick from the host vault", and
 * the assets panel + (potentially) other surfaces all need to bridge
 * `HubResource[] → File[]` the same way.
 */

import { toast } from "sonner";
import type { HubPickAssetOptions, HubResource } from "@/hub/sdk-types";
import { isHubAvailable } from "@/hub/sdk-types";

export async function fetchHubResourceAsFile(
	resource: HubResource,
): Promise<File> {
	const response = await fetch(resource.url, { credentials: "same-origin" });
	if (!response.ok) {
		throw new Error(
			`hub: fetch ${resource.name} failed (${response.status})`,
		);
	}
	const blob = await response.blob();
	const mime = blob.type || guessMimeFromResource(resource);
	return new File([blob], resource.name, {
		type: mime,
		lastModified: Date.now(),
	});
}

function guessMimeFromResource(resource: HubResource): string {
	// Last-resort fallback — `processMediaAssets` reads MIME via
	// `getMediaTypeFromFile` which checks the prefix. If the gateway
	// returned an empty Content-Type we synthesise one from the
	// asset-type bucket so the file still routes correctly.
	switch (resource.type) {
		case "image":
			return "image/*";
		case "video":
			return "video/*";
		case "audio":
			return "audio/*";
		default:
			return "application/octet-stream";
	}
}

/**
 * Open the host modal picker and resolve to the picked resources as
 * `File` objects. Returns `null` when:
 *  - `window.hub` is absent (standalone build / dev server),
 *  - the host shim doesn't expose `pickAsset`, or
 *  - the user cancelled the dialog (or picked nothing).
 *
 * Per-resource fetch failures are toasted and the corresponding entry
 * is skipped; the function still resolves with whatever files were
 * downloaded successfully so a partial batch isn't lost.
 */
export async function pickHubAssetsAsFiles(
	opts?: HubPickAssetOptions,
): Promise<File[] | null> {
	if (!isHubAvailable()) return null;
	const hub = window.hub!;
	if (!hub.canvas.pickAsset) return null;

	const resources = await hub.canvas.pickAsset(opts);
	if (!resources || resources.length === 0) return null;

	const files: File[] = [];
	for (const resource of resources) {
		try {
			files.push(await fetchHubResourceAsFile(resource));
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "unknown error";
			console.error("[hub] failed to fetch resource", resource, error);
			toast.error(`Couldn't load ${resource.name}`, { description: message });
		}
	}

	return files;
}
