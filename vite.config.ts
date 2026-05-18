import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    host: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  preview: {
    port: 5175,
    host: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  worker: {
    format: "es",
    plugins: () => [wasm(), topLevelAwait()],
  },
  optimizeDeps: {
    exclude: ["opencut-wasm", "@huggingface/transformers"],
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
    sourcemap: false,
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          // React + scheduler MUST stay together with anything that depends on them
          // to avoid "Cannot read properties of undefined (reading 'forwardRef')".
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/react-resizable-panels/") ||
            id.includes("/react-window/") ||
            id.includes("/react-hook-form/") ||
            id.includes("/@radix-ui/") ||
            id.includes("/radix-ui/") ||
            id.includes("/@hugeicons/") ||
            id.includes("/lucide-react/") ||
            id.includes("/sonner/")
          ) {
            return "react-vendor";
          }
          if (id.includes("@huggingface/transformers")) return "transformers";
          if (id.includes("mediabunny") || id.includes("opencut-wasm")) {
            return "media-engine";
          }
        },
      },
    },
  },
});
