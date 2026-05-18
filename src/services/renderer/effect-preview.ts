import { createCanvasSurface } from "./canvas-utils";
import { effectsRegistry, resolveEffectPasses } from "@/effects";
import { buildDefaultParamValues } from "@/params/registry";
import type { ParamValues } from "@/params";
import { gpuRenderer } from "./gpu-renderer";

const PREVIEW_SIZE = 160;
const PREVIEW_IMAGE_PATH = `${import.meta.env.BASE_URL}effects/preview.jpg`;

class EffectPreviewService {
	private testSourceCanvas: OffscreenCanvas | null = null;
	private previewImageElement: HTMLImageElement | null = null;
	private onReadyCallbacks = new Set<() => void>();

	readonly PREVIEW_SIZE = PREVIEW_SIZE;

	constructor() {
		this.loadPreviewImage();
	}

	onPreviewImageReady({ callback }: { callback: () => void }): () => void {
		this.onReadyCallbacks.add(callback);
		return () => this.onReadyCallbacks.delete(callback);
	}

	renderPreview({
		effectType,
		params,
		targetCanvas,
		uniformDimensions,
	}: {
		effectType: string;
		params: ParamValues;
		targetCanvas: HTMLCanvasElement;
		uniformDimensions?: { width: number; height: number };
	}): void {
		const size = PREVIEW_SIZE;
		const targetCtx = targetCanvas.getContext(
			"2d",
		) as CanvasRenderingContext2D | null;
		if (!targetCtx) {
			return;
		}

		targetCanvas.width = size;
		targetCanvas.height = size;

		const source = this.getTestSource({ width: size, height: size });
		if (!source) {
			targetCtx.clearRect(0, 0, size, size);
			return;
		}

		try {
			const definition = effectsRegistry.get(effectType);
			const resolvedParams =
				Object.keys(params).length > 0
					? params
					: buildDefaultParamValues(definition.params);

			const passes = resolveEffectPasses({
				definition,
				effectParams: resolvedParams,
				width: uniformDimensions?.width ?? size,
				height: uniformDimensions?.height ?? size,
			});
			const result = this.applyGpuEffect({
				source,
				width: size,
				height: size,
				passes,
			});

			targetCtx.drawImage(result, 0, 0, size, size);
		} catch (error) {
			console.warn("Failed to render effect preview", { effectType, error });
			targetCtx.clearRect(0, 0, size, size);
			targetCtx.drawImage(source, 0, 0, size, size);
		}
	}

	private loadPreviewImage(): void {
		if (typeof window === "undefined") return;
		const image = new Image();
		const notifyReady = () => {
			this.testSourceCanvas = null;
			for (const callback of this.onReadyCallbacks) {
				callback();
			}
		};
		image.onload = notifyReady;
		image.onerror = () => {
			this.previewImageElement = null;
			notifyReady();
		};
		image.src = PREVIEW_IMAGE_PATH;
		this.previewImageElement = image;
	}

	private createTestSource({
		width,
		height,
	}: {
		width: number;
		height: number;
	}): OffscreenCanvas | null {
		const isImageReady =
			this.previewImageElement?.complete &&
			(this.previewImageElement.naturalWidth ?? 0) > 0;
		if (isImageReady && this.previewImageElement) {
			const { canvas, context } = createCanvasSurface({ width, height });
			context.drawImage(this.previewImageElement, 0, 0, width, height);
			return canvas;
		}
		return this.createFallbackTestSource({ width, height });
	}

	private createFallbackTestSource({
		width,
		height,
	}: {
		width: number;
		height: number;
	}): OffscreenCanvas {
		const { canvas, context } = createCanvasSurface({ width, height });

		const gradient = context.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, "#4f46e5");
		gradient.addColorStop(0.5, "#ec4899");
		gradient.addColorStop(1, "#f59e0b");
		context.fillStyle = gradient;
		context.fillRect(0, 0, width, height);

		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.beginPath();
		context.arc(width * 0.32, height * 0.36, Math.min(width, height) * 0.18, 0, Math.PI * 2);
		context.fill();

		context.fillStyle = "rgba(15, 23, 42, 0.85)";
		context.fillRect(width * 0.5, height * 0.55, width * 0.38, height * 0.28);

		context.strokeStyle = "rgba(255, 255, 255, 0.6)";
		context.lineWidth = Math.max(1, Math.min(width, height) * 0.012);
		const step = Math.max(8, Math.floor(Math.min(width, height) / 8));
		for (let x = step; x < width; x += step) {
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, height);
			context.stroke();
		}
		for (let y = step; y < height; y += step) {
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(width, y);
			context.stroke();
		}

		return canvas;
	}

	private getTestSource({
		width,
		height,
	}: {
		width: number;
		height: number;
	}): OffscreenCanvas | null {
		if (
			!this.testSourceCanvas ||
			this.testSourceCanvas.width !== width ||
			this.testSourceCanvas.height !== height
		) {
			this.testSourceCanvas = this.createTestSource({ width, height });
		}
		return this.testSourceCanvas;
	}

	private applyGpuEffect({
		source,
		width,
		height,
		passes,
	}: {
		source: OffscreenCanvas;
		width: number;
		height: number;
		passes: ReturnType<typeof resolveEffectPasses>;
	}): OffscreenCanvas {
		return gpuRenderer.applyEffect({
			source,
			width,
			height,
			passes,
		});
	}
}

export const effectPreviewService = new EffectPreviewService();
