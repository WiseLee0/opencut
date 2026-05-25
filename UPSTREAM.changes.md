# UPSTREAM.diff 改动清单

> 由 `scripts/gen-upstream-diff.sh` 自动生成。

## 基线

- 上游 (a/): `OpenCut/apps/web/src` @ `238750c` (2026-05-18, docs: refocus readme on  rewrite)
- 本地 (b/): `opencut-embed/src` @ `e65e726` (生成于 2026-05-25)

## 统计

- **修改**: 65 个文件（升级时主要冲突点）
- **新增**: 15 个文件（embed 独有，升级时通常保留）
- **删除**: 120 个文件（上游有、embed 已移除，升级时通常忽略）

## 修改的文件 (Modified)

_升级时需重点查看，可能需要重新合并_

### `actions/` (2)

- `actions/keybinding.ts`
- `actions/types.ts`

### `components/` (27)

- `components/editor/editor-header.tsx`
- `components/editor/export-button.tsx`
- `components/editor/panels/assets/assets-panel-store.tsx`
- `components/editor/panels/assets/drag-overlay.tsx`
- `components/editor/panels/assets/draggable-item.tsx`
- `components/editor/panels/assets/index.tsx`
- `components/editor/panels/assets/tabbar.tsx`
- `components/editor/panels/assets/views/assets.tsx`
- `components/editor/panels/assets/views/settings/background.tsx`
- `components/editor/panels/assets/views/settings/index.tsx`
- `components/editor/panels/properties/components/property-param-field.tsx`
- `components/editor/panels/properties/empty-view.tsx`
- `components/editor/panels/properties/index.tsx`
- `components/editor/panels/properties/registry.tsx`
- `components/editor/scenes-view.tsx`
- `components/providers/editor-provider.tsx`
- `components/section.tsx`
- `components/theme-toggle.tsx`
- `components/ui/breadcrumb.tsx`
- `components/ui/color-picker.tsx`
- `components/ui/dialog.tsx`
- `components/ui/font-picker.tsx`
- `components/ui/input.tsx`
- `components/ui/number-field.tsx`
- `components/ui/sheet.tsx`
- `components/ui/sonner.tsx`
- `components/ui/spinner.tsx`

### `core/` (1)

- `core/managers/project-manager.ts`

### `effects/` (2)

- `effects/components/assets-view.tsx`
- `effects/components/effects-tab.tsx`

### `export/` (1)

- `export/index.ts`

### `fonts/` (1)

- `fonts/google-fonts.ts`

### `guides/` (1)

- `guides/definitions/platforms.tsx`

### `preview/` (6)

- `preview/components/context-menu.tsx`
- `preview/components/guide-popover.tsx`
- `preview/components/preview-interaction-overlay.tsx`
- `preview/components/text-edit-overlay.tsx`
- `preview/components/toolbar.tsx`
- `preview/overlays.ts`

### `services/` (6)

- `services/renderer/compositor/frame-descriptor.ts`
- `services/renderer/compositor/types.ts`
- `services/renderer/effect-preview.ts`
- `services/storage/migrations/index.ts`
- `services/storage/service.ts`
- `services/storage/types.ts`

### `stickers/` (4)

- `stickers/categories.ts`
- `stickers/components/assets-view.tsx`
- `stickers/index.ts`
- `stickers/providers/index.ts`

### `subtitles/` (1)

- `subtitles/components/assets-view.tsx`

### `text/` (1)

- `text/components/assets-view.tsx`

### `timeline/` (12)

- `timeline/bookmarks/components/bookmarks.tsx`
- `timeline/bookmarks/preview-overlay-source.tsx`
- `timeline/components/audio-volume-line.tsx`
- `timeline/components/graph-editor/bezier-graph.tsx`
- `timeline/components/graph-editor/popover.tsx`
- `timeline/components/graph-editor/session.ts`
- `timeline/components/graph-editor/use-controller.ts`
- `timeline/components/index.tsx`
- `timeline/components/timeline-element.tsx`
- `timeline/components/timeline-playhead.tsx`
- `timeline/components/timeline-ruler.tsx`
- `timeline/components/timeline-toolbar.tsx`

## 新增的文件 (Added in embed)

_embed 独有新增；升级时一般保留原样_

### `app-globals.css/` (1)

- `app-globals.css`

### `components/` (1)

- `components/ui/image-shim.tsx`

### `embed-editor.tsx/` (1)

- `embed-editor.tsx`

### `hub/` (4)

- `hub/pick-asset.ts`
- `hub/sdk-types.ts`
- `hub/use-hub-app-bridge.ts`
- `hub/use-hub-bridge.ts`

### `i18n/` (5)

- `i18n/dictionaries/en.ts`
- `i18n/dictionaries/zh.ts`
- `i18n/index.ts`
- `i18n/provider.tsx`
- `i18n/types.ts`

### `main.tsx/` (1)

- `main.tsx`

### `theme/` (2)

- `theme/index.ts`
- `theme/theme-provider.tsx`

## 删除/上游独有的文件 (Removed from embed)

_embed 已主动剔除；升级时一般继续保持不引入_

### `actions/` (1)

- `actions/keybindings/__tests__/persistence.test.ts`

### `animation/` (1)

- `animation/__tests__/animated-params.test.ts`

### `components/` (11)

- `components/editor/mobile-gate.tsx`
- `components/editor/onboarding.tsx`
- `components/footer.tsx`
- `components/gitHub-contribute-section.tsx`
- `components/header.tsx`
- `components/landing/handlebars.tsx`
- `components/landing/hero.tsx`
- `components/storage-provider.tsx`
- `components/ui/calendar.tsx`
- `components/ui/prose.tsx`
- `components/ui/react-markdown-wrapper.tsx`

### `fps/` (1)

- `fps/__tests__/fps.test.ts`

### `masks/` (1)

- `masks/__tests__/snap.test.ts`

### `params/` (1)

- `params/__tests__/channel-layout.test.ts`

### `project/` (1)

- `project/components/migration-dialog.tsx`

### `retime/` (2)

- `retime/__tests__/resolve.test.ts`
- `retime/__tests__/split.test.ts`

### `services/` (95)

- `services/storage/components/storage-persistence-dialog.tsx`
- `services/storage/migrations/AGENTS.md`
- `services/storage/migrations/__tests__/fixtures/index.ts`
- `services/storage/migrations/__tests__/fixtures/v0.ts`
- `services/storage/migrations/__tests__/fixtures/v1.ts`
- `services/storage/migrations/__tests__/fixtures/v2.ts`
- `services/storage/migrations/__tests__/fixtures/v3.ts`
- `services/storage/migrations/__tests__/fixtures/v5.ts`
- `services/storage/migrations/__tests__/helpers.ts`
- `services/storage/migrations/__tests__/v0-to-v1.test.ts`
- `services/storage/migrations/__tests__/v1-to-v2.test.ts`
- `services/storage/migrations/__tests__/v15-to-v16.test.ts`
- `services/storage/migrations/__tests__/v16-to-v17.test.ts`
- `services/storage/migrations/__tests__/v18-to-v19.test.ts`
- `services/storage/migrations/__tests__/v19-to-v20.test.ts`
- `services/storage/migrations/__tests__/v2-to-v3.test.ts`
- `services/storage/migrations/__tests__/v20-to-v21.test.ts`
- `services/storage/migrations/__tests__/v21-to-v22.test.ts`
- `services/storage/migrations/__tests__/v22-to-v23.test.ts`
- `services/storage/migrations/__tests__/v26-to-v27.test.ts`
- `services/storage/migrations/__tests__/v27-to-v28.test.ts`
- `services/storage/migrations/__tests__/v28-to-v29.test.ts`
- `services/storage/migrations/__tests__/v29-to-v30.test.ts`
- `services/storage/migrations/__tests__/v3-to-v4.test.ts`
- `services/storage/migrations/__tests__/v30-to-v31.test.ts`
- `services/storage/migrations/__tests__/v4-to-v5.test.ts`
- `services/storage/migrations/__tests__/v5-to-v6.test.ts`
- `services/storage/migrations/__tests__/v8-to-v9.test.ts`
- `services/storage/migrations/base.ts`
- `services/storage/migrations/runner.ts`
- `services/storage/migrations/transformers/index.ts`
- `services/storage/migrations/transformers/types.ts`
- `services/storage/migrations/transformers/utils.ts`
- `services/storage/migrations/transformers/v0-to-v1.ts`
- `services/storage/migrations/transformers/v1-to-v2.ts`
- `services/storage/migrations/transformers/v10-to-v11.ts`
- `services/storage/migrations/transformers/v11-to-v12.ts`
- `services/storage/migrations/transformers/v12-to-v13.ts`
- `services/storage/migrations/transformers/v13-to-v14.ts`
- `services/storage/migrations/transformers/v14-to-v15.ts`
- `services/storage/migrations/transformers/v15-to-v16.ts`
- `services/storage/migrations/transformers/v16-to-v17.ts`
- `services/storage/migrations/transformers/v17-to-v18.ts`
- `services/storage/migrations/transformers/v18-to-v19.ts`
- `services/storage/migrations/transformers/v19-to-v20.ts`
- `services/storage/migrations/transformers/v2-to-v3.ts`
- `services/storage/migrations/transformers/v20-to-v21.ts`
- `services/storage/migrations/transformers/v21-to-v22.ts`
- `services/storage/migrations/transformers/v22-to-v23.ts`
- `services/storage/migrations/transformers/v23-to-v24.ts`
- `services/storage/migrations/transformers/v24-to-v25.ts`
- `services/storage/migrations/transformers/v25-to-v26.ts`
- `services/storage/migrations/transformers/v26-to-v27.ts`
- `services/storage/migrations/transformers/v27-to-v28.ts`
- `services/storage/migrations/transformers/v28-to-v29.ts`
- `services/storage/migrations/transformers/v29-to-v30.ts`
- `services/storage/migrations/transformers/v3-to-v4.ts`
- `services/storage/migrations/transformers/v30-to-v31.ts`
- `services/storage/migrations/transformers/v4-to-v5.ts`
- `services/storage/migrations/transformers/v5-to-v6.ts`
- `services/storage/migrations/transformers/v6-to-v7.ts`
- `services/storage/migrations/transformers/v7-to-v8.ts`
- `services/storage/migrations/transformers/v8-to-v9.ts`
- `services/storage/migrations/transformers/v9-to-v10.ts`
- `services/storage/migrations/v0-to-v1.ts`
- `services/storage/migrations/v1-to-v2.ts`
- `services/storage/migrations/v10-to-v11.ts`
- `services/storage/migrations/v11-to-v12.ts`
- `services/storage/migrations/v12-to-v13.ts`
- `services/storage/migrations/v13-to-v14.ts`
- `services/storage/migrations/v14-to-v15.ts`
- `services/storage/migrations/v15-to-v16.ts`
- `services/storage/migrations/v16-to-v17.ts`
- `services/storage/migrations/v17-to-v18.ts`
- `services/storage/migrations/v18-to-v19.ts`
- `services/storage/migrations/v19-to-v20.ts`
- `services/storage/migrations/v2-to-v3.ts`
- `services/storage/migrations/v20-to-v21.ts`
- `services/storage/migrations/v21-to-v22.ts`
- `services/storage/migrations/v22-to-v23.ts`
- `services/storage/migrations/v23-to-v24.ts`
- `services/storage/migrations/v24-to-v25.ts`
- `services/storage/migrations/v25-to-v26.ts`
- `services/storage/migrations/v26-to-v27.ts`
- `services/storage/migrations/v27-to-v28.ts`
- `services/storage/migrations/v28-to-v29.ts`
- `services/storage/migrations/v29-to-v30.ts`
- `services/storage/migrations/v3-to-v4.ts`
- `services/storage/migrations/v30-to-v31.ts`
- `services/storage/migrations/v4-to-v5.ts`
- `services/storage/migrations/v5-to-v6.ts`
- `services/storage/migrations/v6-to-v7.ts`
- `services/storage/migrations/v7-to-v8.ts`
- `services/storage/migrations/v8-to-v9.ts`
- `services/storage/migrations/v9-to-v10.ts`

### `stickers/` (3)

- `stickers/__tests__/sticker-id.test.ts`
- `stickers/providers/countries-data.ts`
- `stickers/providers/flags.ts`

### `timeline/` (2)

- `timeline/__tests__/update-pipeline.test.ts`
- `timeline/placement/__tests__/resolve.test.ts`

### `utils/` (1)

- `utils/__tests__/math.test.ts`

