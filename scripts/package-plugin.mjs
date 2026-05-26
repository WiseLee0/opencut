#!/usr/bin/env node
// 把 vite 的构建产物同步到 plugin-package/，用于打包 Hub 插件发行物。
// 仅替换构建产物 (assets/、fonts/、index.html)，保留插件元数据
// (manifest.json、icon.svg、LICENSE、NOTICE)。
//
// CDN 外置：fonts/ 与 ORT runtime wasm 在生产构建后从 plugin-package 移除——
// 运行时由 src/hub/cdn-config.ts 根据 region 走 hailuoai.com / hailuoai.video
// 的 plugins-hub/opencut-embed/{fonts,ort,staging} 目录加载。这两个目录的
// 内容只在 vite dev (走 public/) 与 CDN 上保留一份。

import { access, constants, cp, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const pkgDir = path.join(root, "plugin-package");

try {
  await access(distDir, constants.F_OK);
} catch {
  console.error("[package-plugin] 找不到 dist/，请先执行 vite build");
  process.exit(1);
}

const buildArtifacts = ["assets", "fonts", "index.html"];

for (const name of buildArtifacts) {
  await rm(path.join(pkgDir, name), { recursive: true, force: true });
}

let copied = 0;
for (const name of buildArtifacts) {
  const src = path.join(distDir, name);
  try {
    await access(src, constants.F_OK);
  } catch {
    continue;
  }
  await cp(src, path.join(pkgDir, name), { recursive: true });
  copied++;
}

// ── CDN 外置：剔除大文件 ────────────────────────────────────────────────
//
// Vite 把 @huggingface/transformers 内 `new URL('./ort-wasm-...wasm',
// import.meta.url)` 静态解析后会把 ~22MB 的 onnxruntime wasm 也搬进
// dist/assets/。运行时我们已经设置 `env.backends.onnx.wasm.wasmPaths`
// 指向 CDN 的 ort/ 目录，这份 bundled wasm 永远不会被加载——直接删掉
// 节省插件包体积。
//
// fonts/ 同理：font-atlas.json 与 font-chunk-*.avif 共 2.3MB，运行时
// 由 cdn-config 的 getPublicAssetUrl 路由到 CDN 上的 fonts/ 目录。
const removedFiles = [];

const fontsInPkg = path.join(pkgDir, "fonts");
if (await pathExists(fontsInPkg)) {
  await rm(fontsInPkg, { recursive: true, force: true });
  removedFiles.push("fonts/");
}

const assetsInPkg = path.join(pkgDir, "assets");
if (await pathExists(assetsInPkg)) {
  const entries = await readdir(assetsInPkg);
  for (const entry of entries) {
    // 文件名形如 `ort-wasm-simd-threaded.jsep-<hash>.wasm` 或
    // `ort-wasm-simd-threaded-<hash>.wasm`。匹配前缀即可——避免
    // 在哈希变化时漏删。
    if (/^ort-wasm-/.test(entry)) {
      const target = path.join(assetsInPkg, entry);
      await rm(target, { force: true });
      removedFiles.push(`assets/${entry}`);
    }
  }
}

console.log(`[package-plugin] 已同步 ${copied} 项到 plugin-package/`);
if (removedFiles.length > 0) {
  console.log(
    `[package-plugin] 已剔除 ${removedFiles.length} 个 CDN 外置资源:\n  - ${removedFiles.join("\n  - ")}`,
  );
}

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}
