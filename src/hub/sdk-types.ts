/**
 * Type surface for the `window.hub` plugin SDK shim, mirrored from
 * `@hilo/hub-plugin-sdk` (path: `app/packages/hub-plugin-sdk/src/api.ts`).
 *
 * We mirror the upstream types rather than depend on the package because
 * opencut-embed ships standalone — when run via `vite dev` without the
 * hilo gateway, `window.hub` is `undefined` and every consumer no-ops.
 * Keep field shapes & method signatures in sync with the SDK package;
 * the file-level reference link above is the canonical source.
 */

// ── Asset / Resource ────────────────────────────────────────────────────────

export type HubAssetType = "image" | "video" | "audio" | "text" | "file";

export interface HubResource {
	/** Canvas node id (stable; the SDK side calls it `nodeId`). */
	nodeId: string;
	/** Vault asset id (stable too, but `nodeId` is what we key on). */
	assetId: string;
	type: HubAssetType;
	name: string;
	/** Gateway HTTP URL we can `fetch()` directly to pull bytes. */
	url: string;
	path: string;
	width?: number;
	height?: number;
	durationSec?: number;
	fileSize?: number;
	metadata?: Record<string, unknown>;
}

export interface HubResourceFilter {
	type?: HubAssetType | HubAssetType[];
}

export interface HubPickAssetOptions extends HubResourceFilter {
	multi?: boolean;
}

export interface HubInsertNodeResult {
	nodeId: string;
	assetId: string;
}

export interface HubBlobRef {
	__hubBlobRef: true;
	path: string;
	assetId?: string;
}

export interface HubInsertMediaNodeArgs {
	source: Blob | HubBlobRef | string;
	name?: string;
	/**
	 * When set, the host auto-creates a derivation edge from the source
	 * node to the new one. We pass `getCurrentNodeId()` when inserting an
	 * exported video so its lineage stays visible on the canvas.
	 */
	sourceNodeId?: string;
}

export interface HubInsertTextNodeArgs {
	content: string;
	name?: string;
	sourceNodeId?: string;
}

export interface HubInsertFileNodeArgs {
	source: Blob | HubBlobRef | string;
	name?: string;
	sourceNodeId?: string;
	viewMode?: "card" | "preview";
	width?: number;
	height?: number;
}

export interface HubAddPlaceholderArgs {
	sourceNodeId: string;
	prompt: string;
	model: string;
	mediaType?: HubAssetType;
}

export interface HubNodeInfo {
	id: string;
	type: HubAssetType | "placeholder";
	position: { x: number; y: number };
	size: { width: number; height: number };
	data: Record<string, unknown>;
}

// ── App-level host context (locale / theme / region / version) ─────────────

/** Mirrors `HubLocale` from the SDK package. */
export type HubLocale = "en" | "zh";
/** Mirrors `HubTheme` — always resolved (never `"system"`). */
export type HubTheme = "light" | "dark";
/** Mirrors `HubRegion` — which CDNs/third-party services are reachable. */
export type HubRegion = "domestic" | "overseas";

export interface HubAppInfo {
	locale: HubLocale;
	theme: HubTheme;
	region: HubRegion;
	/** Host app version, e.g. "0.1.0". Empty string when unknown. */
	version: string;
}

// ── API surfaces ────────────────────────────────────────────────────────────

export interface HubCanvasApi {
	getCurrentNodeId(): string;
	getIncomingResources(filter?: HubResourceFilter): Promise<HubResource[]>;
	getNode?(nodeId: string): Promise<HubNodeInfo | null>;
	pickAsset?(opts?: HubPickAssetOptions): Promise<HubResource[] | null>;
	insertImageNode?(args: HubInsertMediaNodeArgs): Promise<HubInsertNodeResult>;
	insertVideoNode(args: HubInsertMediaNodeArgs): Promise<HubInsertNodeResult>;
	insertAudioNode?(args: HubInsertMediaNodeArgs): Promise<HubInsertNodeResult>;
	insertTextNode?(args: HubInsertTextNodeArgs): Promise<HubInsertNodeResult>;
	insertFileNode?(args: HubInsertFileNodeArgs): Promise<HubInsertNodeResult>;
	updateNodeData?(
		nodeId: string,
		patch: Record<string, unknown>,
	): Promise<void>;
	addPlaceholder?(args: HubAddPlaceholderArgs): Promise<string | null>;
	failPlaceholder?(placeholderId: string, errorMessage: string): Promise<void>;
	cleanupPlaceholder?(placeholderId: string): Promise<void>;
	onIncomingChange(cb: () => void): () => void;
}

export interface HubStorageApi {
	get<T = unknown>(key: string): Promise<T | undefined>;
	set(key: string, value: unknown): Promise<void>;
	delete(key: string): Promise<void>;
	keys?(): Promise<string[]>;
}

export interface HubUiApi {
	notify(message: string, level?: "info" | "warning" | "error"): void;
}

/**
 * Read-only host context. Synchronous getters surface the SDK-cached
 * snapshot — no postMessage round-trip — so React components can read
 * during render. `onChange` fires after the host pushes a refreshed
 * snapshot (locale flip, theme toggle, …).
 *
 * Optional in our local mirror: older shim builds may not include the
 * `app` field. Consumers must null-check before reading.
 */
export interface HubAppApi {
	readonly locale: HubLocale;
	readonly theme: HubTheme;
	readonly region: HubRegion;
	readonly version: string;
	getInfo(): HubAppInfo;
	onChange(cb: (info: HubAppInfo) => void): () => void;
}

export interface HubApi {
	readonly version?: string;
	readonly ready: Promise<void>;
	readonly canvas: HubCanvasApi;
	readonly storage: HubStorageApi;
	readonly ui: HubUiApi;
	/**
	 * Optional in this mirror: older gateway shims (pre-app-context)
	 * don't ship this field. Consumers must guard before reading.
	 */
	readonly app?: HubAppApi;
	/**
	 * Register a "main" handler the canvas-side Run button invokes.
	 * Returns a disposer that clears the handler. Optional in this
	 * mirror — fall back to inline buttons when absent.
	 */
	onRun?(handler: () => Promise<void> | void): () => void;
}

declare global {
	interface Window {
		hub?: HubApi;
	}
}

/** True when the iframe is wired to a hilo canvas host. */
export function isHubAvailable(): boolean {
	return typeof window !== "undefined" && !!window.hub;
}

/** True when the host shim exposes `hub.app` (locale/theme context). */
export function isHubAppAvailable(): boolean {
	return isHubAvailable() && !!window.hub?.app;
}
