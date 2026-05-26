/**
 * CDN config — resolves the right static-asset host for the current
 * release region.
 *
 * The big bundles (fonts, ORT runtime wasm, Whisper ONNX models) live
 * outside the plugin tarball: they're hosted at
 *
 *   - domestic: https://cdn.hailuoai.com/hailuo-video-web/public_assets/
 *   - overseas: https://cdn.hailuoai.video/open-hailuo-video-web/public_assets/
 *
 * Both buckets host the same `plugins-hub/opencut-embed/{fonts,ort,staging}`
 * tree. We pick a bucket per request by reading `hub.app.region` (the
 * gateway seeds `'domestic'` so the same default applies when the iframe
 * runs standalone). `vite dev` has no gateway, so it falls through to
 * the `domestic` default — DEV and PROD both pull assets from the CDN.
 *
 * Two helpers, same policy:
 *  - `getPublicAssetUrl()` — for things we ALSO keep under the project's
 *    `public/` directory (fonts).
 *  - `getCdnAssetUrl()` — for things only available on the CDN (ORT
 *    runtime wasm, Whisper ONNX dumps).
 *
 * Both always resolve to the regional CDN. The split is kept for
 * documentation: `public/`-replicated assets can in principle be served
 * locally, but we route them through the CDN in DEV too so the dev path
 * mirrors prod (no surprise cache/CORS differences when shipping).
 *
 * Workers don't have access to `window.hub`, so we snapshot the resolved
 * config on the main thread and ship it across via postMessage.
 */

import type { HubRegion } from "@/hub/sdk-types";

const CDN_BASES: Record<HubRegion, string> = {
	domestic:
		"https://cdn.hailuoai.com/hailuo-video-web/public_assets/opencut-embed/",
	overseas:
		"https://cdn.hailuoai.video/open-hailuo-video-web/public_assets/opencut-embed/",
};

const DEFAULT_REGION: HubRegion = "domestic";

/**
 * Snapshot of the resolved CDN config — safe to clone across a worker
 * postMessage boundary so workers can apply the same routing the main
 * thread uses.
 */
export interface CdnConfigSnapshot {
	region: HubRegion;
	/** Regional CDN base WITH trailing slash. Always populated. */
	cdnBase: string;
	/**
	 * Base for `public/`-replicated assets WITH trailing slash. Currently
	 * equal to `cdnBase` in both DEV and PROD; kept as a separate field
	 * so a future override (e.g. local font iteration) only touches one
	 * call site.
	 */
	publicAssetBase: string;
}

function isHubRegion(value: unknown): value is HubRegion {
	return value === "domestic" || value === "overseas";
}

function resolveRegion(): HubRegion {
	if (typeof window === "undefined") return DEFAULT_REGION;
	const region = window.hub?.app?.region;
	return isHubRegion(region) ? region : DEFAULT_REGION;
}

/**
 * Regional CDN base (with trailing slash). Always returns a CDN URL —
 * even under `vite dev` — because the assets this base is used for are
 * too large to mirror locally (ORT wasm, Whisper models).
 */
export function getCdnBase(): string {
	return CDN_BASES[resolveRegion()];
}

/**
 * Base for assets we also keep in the project's `public/` directory.
 * Returns the regional CDN in both DEV and PROD so the dev path mirrors
 * prod — no cache/CORS surprises when shipping.
 */
export function getPublicAssetBase(): string {
	return getCdnBase();
}

/**
 * Build a URL for a small asset that we ALSO ship under `public/`
 * (fonts). Always regional CDN, DEV and PROD. `relativePath` should not
 * start with `/` — e.g. `'fonts/font-atlas.json'`.
 */
export function getPublicAssetUrl(relativePath: string): string {
	const trimmed = relativePath.replace(/^\/+/, "");
	return `${getPublicAssetBase()}${trimmed}`;
}

/**
 * Build a URL for a big asset that only exists on the CDN (ORT runtime
 * wasm, Whisper model files). Always regional CDN; DEV is no special
 * case here. `relativePath` should not start with `/`.
 */
export function getCdnAssetUrl(relativePath: string): string {
	const trimmed = relativePath.replace(/^\/+/, "");
	return `${getCdnBase()}${trimmed}`;
}

/**
 * Snapshot the resolved config so it can be cloned across a worker
 * postMessage boundary. Call on the main thread when spinning up a
 * worker that needs to make the same routing decisions.
 */
export function snapshotCdnConfig(): CdnConfigSnapshot {
	return {
		region: resolveRegion(),
		cdnBase: getCdnBase(),
		publicAssetBase: getPublicAssetBase(),
	};
}
