# KAT ZRT. — website

Company website for **KAT ZRT.**, built with Vite + React and deployed to GitHub Pages.

## Stack

- **Vite + React 18** (single-page app)
- **GitHub Pages** hosting, deployed automatically via GitHub Actions (`.github/workflows/deploy.yml`)
- `base: "./"` in `vite.config.js` so assets resolve under the Pages project subpath

## Run locally

```bash
npm install      # first time only
npm run dev      # start the Vite dev server (hot reload)
```

Build a production bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built dist/ locally
```

## Deploy

Every push to `main` triggers the **Deploy to GitHub Pages** workflow, which builds
the site and publishes `dist/`. You can also run it manually from the **Actions** tab.

## Project layout

```
index.html              Vite entry (head: title, SEO, favicon)
src/main.jsx            React app entry
public/                 static assets copied as-is (public/assets/favicon.svg)
.github/workflows/      deploy.yml — Pages build & deploy
vite.config.js          base "./" for the Pages subpath
```

> The real UI is being brought in from the Claude Design handoff. The current
> `src/main.jsx` is a minimal placeholder confirming the build works.
