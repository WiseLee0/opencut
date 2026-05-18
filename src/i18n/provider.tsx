/**
 * Locale provider + `useT()` hook.
 *
 * Design notes:
 *  - The dictionary is statically typed via {@link Dictionary} so missing
 *    keys break the build. `useT()` returns a function with a structural
 *    return type — leaf strings only, nested groups are not callable.
 *  - Translation lookup is a dot-path walk against the active dictionary.
 *    Falls back to `en` if a key is missing in the active locale (defensive
 *    — `satisfies Dictionary` already prevents this at build time).
 *  - Placeholder interpolation is a literal `{name}` → `String(value)`
 *    replace. No pluralisation/ICU — the dictionary holds variant keys
 *    instead (`savedCountOne` vs `savedCountMany`).
 *  - Provider exposes `setLocale` for the ThemeToggle/standalone path AND
 *    for `hub.app.onChange` to push host-driven locale flips through.
 */

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import { en, type Dictionary } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";
import { isLocale, type Locale } from "./types";

const DICTIONARIES: Record<Locale, Dictionary> = { en, zh };
const STORAGE_KEY = "opencut-embed:locale";

interface LocaleContextValue {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readPersistedLocale(): Locale | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return isLocale(raw) ? raw : null;
	} catch {
		return null;
	}
}

function detectBrowserLocale(): Locale {
	if (typeof navigator === "undefined") return "en";
	const lang = (navigator.language ?? "en").toLowerCase();
	return lang.startsWith("zh") ? "zh" : "en";
}

export interface LocaleProviderProps {
	children: ReactNode;
	/**
	 * Initial locale — usually omitted so the provider auto-detects from
	 * `navigator.language` (overridden by a previously-persisted choice).
	 * Pass an explicit value when the host (`hub.app.locale`) wants to
	 * pin a specific locale at mount.
	 */
	initialLocale?: Locale;
	/** When true, persist `setLocale` choices to localStorage. Default true. */
	persist?: boolean;
}

export function LocaleProvider({
	children,
	initialLocale,
	persist = true,
}: LocaleProviderProps) {
	const [locale, setLocaleState] = useState<Locale>(() => {
		if (initialLocale) return initialLocale;
		return readPersistedLocale() ?? detectBrowserLocale();
	});

	const setLocale = useCallback(
		(next: Locale) => {
			setLocaleState(next);
			if (persist && typeof window !== "undefined") {
				try {
					window.localStorage.setItem(STORAGE_KEY, next);
				} catch {
					// Ignore quota / privacy-mode failures — locale still
					// flips in memory for the current session.
				}
			}
		},
		[persist],
	);

	useEffect(() => {
		if (typeof document === "undefined") return;
		document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
	}, [locale]);

	const value = useMemo<LocaleContextValue>(
		() => ({ locale, setLocale, dict: DICTIONARIES[locale] }),
		[locale, setLocale],
	);

	return (
		<LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
	);
}

function useLocaleContext(): LocaleContextValue {
	const value = useContext(LocaleContext);
	if (!value) {
		throw new Error("useLocale/useT must be used inside <LocaleProvider>");
	}
	return value;
}

export function useLocale(): {
	locale: Locale;
	setLocale: (locale: Locale) => void;
} {
	const { locale, setLocale } = useLocaleContext();
	return { locale, setLocale };
}

type ReplaceArgs = Record<string, string | number>;

function interpolate(template: string, args?: ReplaceArgs): string {
	if (!args) return template;
	return template.replace(/\{(\w+)\}/g, (match, key: string) => {
		const value = args[key];
		return value === undefined ? match : String(value);
	});
}

/**
 * Translator hook. Returns a function that resolves a dot-path against
 * the active dictionary and optionally interpolates `{name}` placeholders.
 *
 * @example
 * const t = useT();
 * t("export.buttonInsert")             // "Insert" / "插入画布"
 * t("export.insertedNotice", { name }) // "Inserted foo.mp4 into canvas"
 *
 * Unknown keys log once and return the key itself, so a missing-key bug
 * surfaces in the UI without taking the whole panel down.
 */
export function useT(): (path: string, args?: ReplaceArgs) => string {
	const { dict } = useLocaleContext();
	return useCallback(
		(path, args) => {
			const value = resolve(dict, path);
			if (typeof value !== "string") {
				const fallback = resolve(en, path);
				if (typeof fallback === "string") return interpolate(fallback, args);
				if (typeof console !== "undefined") {
					console.warn(`[i18n] missing key: ${path}`);
				}
				return path;
			}
			return interpolate(value, args);
		},
		[dict],
	);
}

function resolve(dict: Dictionary, path: string): unknown {
	const parts = path.split(".");
	let cursor: unknown = dict;
	for (const part of parts) {
		if (cursor && typeof cursor === "object" && part in cursor) {
			cursor = (cursor as Record<string, unknown>)[part];
		} else {
			return undefined;
		}
	}
	return cursor;
}
