/**
 * STICKER_CATEGORIES preserves the original flat shape `{ key: label }`
 * so that existing consumers in `stickers/index.ts` and
 * `stickers/stickers-store.ts` (e.g. `STICKER_CATEGORIES[category]` for
 * section titles, `category in STICKER_CATEGORIES` for membership checks,
 * `keyof typeof STICKER_CATEGORIES` for the StickerCategory type) keep
 * working without modification.
 *
 * The parallel `STICKER_CATEGORY_LABEL_KEYS` constant maps each category
 * key to its i18n dictionary path so React consumers can render the
 * translated label via `t(STICKER_CATEGORY_LABEL_KEYS[key])`.
 */
export const STICKER_CATEGORIES = {
	all: "All",
	// v0.4.0
	// logos: "Logos",
	shapes: "Shapes",
};

export const STICKER_CATEGORY_LABEL_KEYS = {
	all: "stickers.categoryAll",
	shapes: "stickers.categoryShapes",
} as const;
