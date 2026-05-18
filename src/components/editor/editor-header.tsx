import { ExportButton } from "./export-button";
import { ThemeToggle } from "../theme-toggle";

export function EditorHeader() {
	return (
		<header className="bg-background flex h-[3.4rem] items-center justify-between px-3 pt-0.5">
			<div className="flex items-center gap-1" />
			<nav className="flex items-center gap-2">
				<ExportButton />
				<ThemeToggle />
			</nav>
		</header>
	);
}
