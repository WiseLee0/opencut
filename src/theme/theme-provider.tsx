/**
 * Theme provider — owns the `<html class="dark">` toggle.
 *
 * Sources, in priority order:
 *  1. `hub.app.theme` (when the iframe is wired to a hilo canvas with the
 *     app-context shim). Theme follows the host snapshot; `setTheme` from
 *     this provider becomes a no-op since the host owns the truth.
 *  2. Persisted `localStorage` value from a previous standalone session.
 *  3. `prefers-color-scheme` media query.
 *  4. Hard fallback: `"dark"` (matches the legacy boot behaviour).
 *
 * `useTheme()` returns the resolved theme plus a setter; `useIsThemeControlledByHub()`
 * tells the ThemeToggle whether to render itself (we hide the toggle when
 * the host owns the theme — round-tripping a flip from iframe → host → SDK
 * snapshot → iframe creates a 200ms flicker that looks broken).
 */

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react";
import {
	isHubAppAvailable,
	isHubAvailable,
	type HubAppInfo,
	type HubTheme,
} from "@/hub/sdk-types";

export type Theme = HubTheme;

const STORAGE_KEY = "opencut-embed:theme";

interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	/** True when `hub.app` is the source of truth — `setTheme` is a no-op. */
	controlledByHub: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: unknown): value is Theme {
	return value === "light" || value === "dark";
}

function readPersistedTheme(): Theme | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return isTheme(raw) ? raw : null;
	} catch {
		return null;
	}
}

function detectSystemTheme(): Theme {
	if (typeof window === "undefined") return "dark";
	if (
		typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-color-scheme: light)").matches
	) {
		return "light";
	}
	return "dark";
}

function applyTheme(theme: Theme): void {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (theme === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
}

export interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const controlledByHubInitial = isHubAppAvailable();
	const initialThemeRef = useRef<Theme | null>(null);
	if (initialThemeRef.current === null) {
		// Resolution order — see file header.
		if (controlledByHubInitial && window.hub?.app) {
			initialThemeRef.current = window.hub.app.theme;
		} else {
			initialThemeRef.current =
				readPersistedTheme() ?? detectSystemTheme();
		}
	}

	const [theme, setThemeState] = useState<Theme>(
		() => initialThemeRef.current ?? "dark",
	);
	const [controlledByHub, setControlledByHub] = useState<boolean>(
		controlledByHubInitial,
	);

	// Apply the resolved theme synchronously on every change so the
	// document class never lags the React state.
	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	// Bridge to `hub.app` — subscribe once the SDK has handshook so we
	// react to host-side flips. When the host shim doesn't ship `app`
	// at all (legacy gateway) this resolves to a no-op.
	useEffect(() => {
		if (!isHubAvailable()) return;
		const hub = window.hub!;
		let disposed = false;
		let unsubscribe: (() => void) | null = null;

		(async () => {
			try {
				await hub.ready;
			} catch {
				return;
			}
			if (disposed) return;
			const app = hub.app;
			if (!app) {
				// Late-arriving handshake confirmed no app-context — make
				// sure the toggle becomes visible.
				setControlledByHub(false);
				return;
			}
			setControlledByHub(true);
			setThemeState(app.theme);
			unsubscribe = app.onChange((info: HubAppInfo) => {
				setThemeState(info.theme);
			});
		})();

		return () => {
			disposed = true;
			if (unsubscribe) unsubscribe();
		};
	}, []);

	const setTheme = useCallback(
		(next: Theme) => {
			if (controlledByHub) {
				// Host owns the truth — flipping locally would desync from
				// the next `onChange` snapshot. No-op.
				return;
			}
			setThemeState(next);
			if (typeof window !== "undefined") {
				try {
					window.localStorage.setItem(STORAGE_KEY, next);
				} catch {
					// Ignore quota / private-mode failures.
				}
			}
		},
		[controlledByHub],
	);

	const value = useMemo<ThemeContextValue>(
		() => ({ theme, setTheme, controlledByHub }),
		[theme, setTheme, controlledByHub],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

function useThemeContext(): ThemeContextValue {
	const value = useContext(ThemeContext);
	if (!value) {
		throw new Error("useTheme must be used inside <ThemeProvider>");
	}
	return value;
}

export function useTheme(): {
	theme: Theme;
	setTheme: (theme: Theme) => void;
} {
	const { theme, setTheme } = useThemeContext();
	return { theme, setTheme };
}

/**
 * Returns true when the host (`hub.app`) is the source of truth for the
 * theme. The ThemeToggle uses this to hide itself in embedded mode —
 * flipping the toggle when the host owns the truth would be a no-op and
 * confuses users.
 */
export function useIsThemeControlledByHub(): boolean {
	return useThemeContext().controlledByHub;
}
