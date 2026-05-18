"use client";

import {
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { usePreviewViewport } from "@/preview/components/preview-viewport";
import { useEditor } from "@/editor/use-editor";
import type { PreviewOverlayControl } from "@/preview/overlays";
import { useT } from "@/i18n";
import { toast } from "sonner";

export function PreviewContextMenu({
	onToggleFullscreen,
	container,
	overlayControls,
	onOverlayVisibilityChange,
}: {
	onToggleFullscreen: () => void;
	container: HTMLElement | null;
	overlayControls: PreviewOverlayControl[];
	onOverlayVisibilityChange: (params: {
		overlayId: string;
		isVisible: boolean;
	}) => void;
}) {
	const editor = useEditor();
	const viewport = usePreviewViewport();
	const t = useT();

	const handleCopySnapshot = async () => {
		const result = await editor.renderer.copySnapshot();

		if (!result.success) {
			toast.error(t("preview.failedCopySnapshot"), {
				description: result.error ?? t("common.pleaseTryAgain"),
			});
			return;
		}
	};

	const handleSaveSnapshot = async () => {
		const result = await editor.renderer.saveSnapshot();

		if (!result.success) {
			toast.error(t("preview.failedSaveSnapshot"), {
				description: result.error ?? t("common.pleaseTryAgain"),
			});
			return;
		}
	};

	return (
		<ContextMenuContent className="w-56" container={container}>
			<ContextMenuItem onClick={viewport.fitToScreen} inset>
				{t("preview.fitToScreen")}
			</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuItem onClick={onToggleFullscreen} inset>
				{t("preview.fullScreen")}
			</ContextMenuItem>
			<ContextMenuItem onClick={handleSaveSnapshot} inset>
				{t("preview.saveSnapshot")}
			</ContextMenuItem>
			<ContextMenuItem onClick={handleCopySnapshot} inset>
				{t("preview.copySnapshot")}
			</ContextMenuItem>
			{overlayControls.length > 0 ? <ContextMenuSeparator /> : null}
			{overlayControls.map((overlayControl) => (
				<ContextMenuCheckboxItem
					key={overlayControl.id}
					checked={overlayControl.isVisible}
					onCheckedChange={(checked) =>
						onOverlayVisibilityChange({
							overlayId: overlayControl.id,
							isVisible: !!checked,
						})
					}
				>
					{t(overlayControl.labelKey)}
				</ContextMenuCheckboxItem>
			))}
		</ContextMenuContent>
	);
}
