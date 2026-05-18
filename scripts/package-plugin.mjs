#!/usr/bin/env node
// 把 vite 的构建产物同步到 plugin-package/，用于打包 Hub 插件发行物。
// 仅替换构建产物 (assets/、fonts/、index.html)，保留插件元数据
// (manifest.json、icon.svg、LICENSE、NOTICE)。

import { access, constants, cp, rm } from "node:fs/promises";
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

console.log(`[package-plugin] 已同步 ${copied} 项到 plugin-package/`);
