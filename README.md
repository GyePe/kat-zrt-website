# KAT Zrt. — website

Bilingual (Hungarian master / English) marketing website for **KAT Könyvszakértő,
Adószakértő, Tanácsadó Zrt.**, a Budapest accounting · payroll · advisory · tax firm.

Built as a **Vite + React 18 single-page app** (mirroring the OTOBOT project), from the
Claude Design handoff (`HANDOFF.md`). The design system `kat.css` is reused verbatim, so
the look stays pixel-identical to the handoff; the page structure, i18n, motion and form
are implemented in React.

## Stack

- **Vite + React 18** SPA with **hash-based routing** (`#/rolunk`, `#/konyveles`, …)
- `kat.css` = the canonical design system (reused verbatim); `pages.css` = a few
  page-specific styles ported from the design's per-page `<style>` blocks
- `base: "./"` in `vite.config.js` so assets resolve under the GitHub Pages subpath
- Deployed to **GitHub Pages via GitHub Actions** (`.github/workflows/deploy.yml`:
  `npm ci` → `vite build` → publish `dist/`)

## Run locally

```bash
npm install      # first time
npm run dev      # Vite dev server (hot reload)
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

## Source layout

```
index.html        Vite entry (head: title, meta, Google Fonts)
src/main.jsx      App + hash router + per-route titles, mounts <LangProvider>
src/ui.jsx        Lang context + <T hu en> helper, useReveal/useTilt hooks,
                  Header, Footer, PageHero, CtaBand, Ledger, EnquiryForm
src/pages.jsx     Home, About, Services, ServiceDetail (data-driven), References,
                  Contact, Imprint, Privacy
src/data.js       Bilingual content: SERVICES (01–04), REFERENCES, REGISTER_GROUPS
src/kat.css       Canonical design system (verbatim from the handoff)
src/pages.css     Page-specific styles (principles, svc-nav, kv rows, draft note)
src/kat-logo.png  White wordmark (header + footer)
HANDOFF.md        Original design handoff spec (reference)
CLAUDE.md         Build constitution + project notes
```

### i18n
Every translatable string is provided in both languages via the `<T hu="…" en="…" />`
helper (use `html` for inline markup, `as="div" html` for block HTML). A `LangProvider`
holds the current language (persisted in `localStorage` under `kat-lang`, default `hu`)
and re-renders all `<T>` when it changes. Do **not** translate company/brand names in the
Register, the firm name, or Hungarian addresses.

## Deploy

Every push to `main` triggers the **Deploy to GitHub Pages** workflow.
Live URL: https://gyepe.github.io/kat-zrt-website/

## Before go-live — real data still needed

1. **Contact-form backend** — wire the enquiry form to email `info@katzrt.hu`
   (planned via Web3Forms, client-side, like OTOBOT). Must not go live before the
   privacy page is final.
2. **Legal values** in `src/pages.jsx` Imprint (cégjegyzékszám, adószám, képviselő,
   tárhelyszolgáltató — currently "megadás alatt").
3. **Final privacy text** (currently a labelled draft).
4. **Full client roster** for The Register (8 of ~23 shown — edit `src/data.js`).
5. **Photography** for the `.bg-ph` placeholders.
6. **SEO** — per-page meta/OG, sitemap, robots, JSON-LD.
