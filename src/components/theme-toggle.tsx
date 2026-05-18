import { Button } from "./ui/button";
import { cn } from "@/utils/ui";
import { Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme, useIsThemeControlledByHub } from "@/theme";
import { useT } from "@/i18n";

interface ThemeToggleProps {
	className?: string;
	iconClassName?: string;
	onToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Manual theme switcher. Hidden when the host (`hub.app`) is the source
 * of truth — the user controls the theme from the canvas-side settings
 * in that mode and a local toggle would be a no-op.
 */
export function ThemeToggle({
	className,
	iconClassName,
	onToggle,
}: ThemeToggleProps) {
	const t = useT();
	const { theme, setTheme } = useTheme();
	const controlledByHub = useIsThemeControlledByHub();

	if (controlledByHub) return null;

	return (
		<Button
			size="icon"
			variant="ghost"
			className={cn("size-8", className)}
			onClick={(e) => {
				setTheme(theme === "dark" ? "light" : "dark");
				onToggle?.(e);
			}}
		>
			<HugeiconsIcon
				icon={Sun03Icon}
				className={cn("size-[1.1rem]!", iconClassName)}
			/>
			<span className="sr-only">
				{theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
			</span>
		</Button>
	);
}
