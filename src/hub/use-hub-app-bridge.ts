/**
 * Hub → app-context bridge.
 *
 * Mounts inside the editor tree and pushes `hub.app.locale` changes into
 * the LocaleProvider so plugin locale flips initiated by the host (the
 * user changing their UI language in the canvas-side settings menu)
 * propagate into the iframe live.
 *
 * Theme is handled by `ThemeProvider` directly (it can subscribe before
 * the editor mounts since it owns `<html class="dark">`). Locale needs
 * to live inside the React tree because the dictionary lookup happens
 * via context — hence this small bridge hook rather than baking hub
 * knowledge into LocaleProvider itself.
 *
 * No-ops when `window.hub` is missing or the host shim predates the
 * `app` context (`hub.app === undefined`).
 */

import { useEffect } from "react";
import { useLocale } from "@/i18n";
import { isHubAppAvailable, type HubAppInfo } from "@/hub/sdk-types";

export function useHubAppBridge(): void {
	const { locale, setLocale } = useLocale();

	useEffect(() => {
		if (!isHubAppAvailable()) return;
		const hub = window.hub!;
		const app = hub.app;
		if (!app) return;

		let disposed = false;
		let unsubscribe: (() => void) | null = null;

		(async () => {
			try {
				await hub.ready;
			} catch {
				return;
			}
			if (disposed) return;
			// Sync the SDK-cached snapshot once on mount, then subscribe
			// for live changes. Skip the initial sync if it already matches
			// to avoid unnecessary re-renders.
			if (app.locale !== locale) {
				setLocale(app.locale);
			}
			unsubscribe = app.onChange((info: HubAppInfo) => {
				setLocale(info.locale);
			});
		})();

		return () => {
			disposed = true;
			if (unsubscribe) unsubscribe();
		};
		// `locale` is only read for the equality check on mount — we
		// intentionally re-run whenever the local state changes so we
		// re-subscribe with a fresh closure.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setLocale]);
}
