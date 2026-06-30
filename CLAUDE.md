# KAT ZRT. website — project notes for Claude

## What this is
Company website for **KAT ZRT.**, built to mirror the OTOBOT project's proven setup.

## Stack & hosting
- **Vite + React 18** SPA. Entry: `index.html` → `src/main.jsx`.
- `vite.config.js` uses `base: "./"` (relative asset URLs) so the site works under
  the GitHub Pages project subpath without hardcoding it.
- Hosted on **GitHub Pages**, deployed by `.github/workflows/deploy.yml` on every
  push to `main` (or manual dispatch). Build target `es2022` (top-level await OK).
- GitHub account: **GyePe**. Commit as `290713436+GyePe@users.noreply.github.com`.

## Run / build
- `npm install`, then `npm run dev` (hot reload) or `npm run build` → `dist/`.
- Node 24 + npm are installed but not always on PATH in open shells — use full paths
  (`C:\Program Files\nodejs\`) or a fresh terminal. Same for `gh`
  (`C:\Program Files\GitHub CLI\gh.exe`).

## Status
- Scaffold created; `src/main.jsx` is a placeholder pending the **Claude Design handoff**.
- The real design/markup will be integrated next.

## Conventions to carry over from OTOBOT (apply as they become relevant)
- Bilingual/i18n + theming if needed.
- Forms via Web3Forms.
- If inventory/content automation is wanted: Google Sheet = source of truth →
  daily sync workflow rebuilds & deploys; images via Drive → Cloudinary.
- Keep the project **out of OneDrive** (lives in `C:\dev\`) to avoid sync/file-lock
  issues with node_modules and builds.
