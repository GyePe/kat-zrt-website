import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes built asset URLs relative, so the site works under the
// GitHub Pages project subpath (/kat-zrt-website/) without hardcoding it.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
  },
});
