import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes all built asset URLs relative, so the site works under the
// GitHub Pages project subpath (/kat-zrt-website/) without hardcoding it.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // es2022 so top-level await (e.g. fetching JSON on startup) is supported.
    target: "es2022",
  },
});
