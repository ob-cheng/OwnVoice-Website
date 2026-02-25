import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Use '/' for local dev so localhost works. Use './' for GitHub Pages builds.
  base: command === "serve" ? "/" : "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
}));
