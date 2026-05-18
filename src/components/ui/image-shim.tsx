// Drop-in shim for `next/image` Image component.
// Forwards `src`, `alt`, dimensions, className, style, onError, etc. to
// a native <img>. The `fill` prop is mapped to absolute-fill positioning.
// Other Next-only props (loader, unoptimized, priority, placeholder, blur*,
// quality, sizes) are accepted and ignored — all consumers in this project
// already pass `unoptimized`.

import {
	type CSSProperties,
	type ImgHTMLAttributes,
	type ReactEventHandler,
	forwardRef,
} from "react";
import { cn } from "@/utils/ui";

type NativeImg = ImgHTMLAttributes<HTMLImageElement>;

interface ImageShimProps
	extends Omit<NativeImg, "src" | "alt" | "width" | "height"> {
	src: string | { src: string };
	alt: string;
	width?: number | string;
	height?: number | string;
	fill?: boolean;
	unoptimized?: boolean;
	priority?: boolean;
	loading?: "lazy" | "eager";
	quality?: number;
	sizes?: string;
	placeholder?: string;
	blurDataURL?: string;
	loader?: unknown;
	onError?: ReactEventHandler<HTMLImageElement>;
}

export const Image = forwardRef<HTMLImageElement, ImageShimProps>(
	function ImageShim(
		{
			src,
			alt,
			width,
			height,
			fill,
			className,
			style,
			loading = "lazy",
			// strip next-only props
			unoptimized: _u,
			priority: _p,
			quality: _q,
			sizes: _s,
			placeholder: _ph,
			blurDataURL: _b,
			loader: _l,
			...rest
		},
		ref,
	) {
		const resolvedSrc = typeof src === "string" ? src : src.src;
		const fillStyle: CSSProperties | undefined = fill
			? {
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
				}
			: undefined;
		return (
			<img
				ref={ref}
				src={resolvedSrc}
				alt={alt}
				width={fill ? undefined : width}
				height={fill ? undefined : height}
				loading={loading}
				className={cn(fill && "object-cover", className)}
				style={{ ...fillStyle, ...style }}
				{...rest}
			/>
		);
	},
);

export default Image;
