/**
 * Locale identifiers. Mirrors the {@link HubLocale} enum from
 * `@hilo/hub-plugin-sdk` — we keep the wire shape identical so the SDK
 * snapshot can be passed straight through to the provider.
 */
export type Locale = "en" | "zh";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "zh"] as const;

export function isLocale(value: unknown): value is Locale {
	return value === "en" || value === "zh";
}
