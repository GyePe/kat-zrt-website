# KAT Zrt. website — notes for Claude

Bilingual (HU master / EN) marketing site for a Budapest accounting/payroll/tax firm.
Built as a **Vite + React 18 SPA** (true OTOBOT-style architecture) from the Claude Design
handoff (`HANDOFF.md`). `kat.css` is reused **verbatim** — keep the design pixel-identical.

## Project facts
- **Repo:** `GyePe/kat-zrt-website` (public). Local: `C:\dev\kat-zrt-website` (out of
  OneDrive on purpose — OneDrive sync fights node_modules/builds).
- **Hosting:** GitHub Pages via **GitHub Actions** (`.github/workflows/deploy.yml`,
  `npm ci` → `vite build` → publish `dist/`). Pages source = "GitHub Actions" (workflow).
  Live: https://gyepe.github.io/kat-zrt-website/
- **GitHub account:** GyePe. Commit as `290713436+GyePe@users.noreply.github.com`.
- `gh` at `C:\Program Files\GitHub CLI\gh.exe`; Node at `C:\Program Files\nodejs\`
  (not always on PATH in open shells — use full paths or a fresh terminal).
- **`workflow` token scope:** the deploy workflow lives under `.github/workflows/`, so
  pushing it needs the gh token's `workflow` scope (`gh auth refresh -h github.com -s workflow`).
- History: first shipped as a static multi-page site, then **rebuilt in React on branch
  `react-rebuild`** (user's call: "import to the new architecture just like OTOBOT").

## Architecture
- `index.html` → `src/main.jsx` (hash router + per-route document titles, mounts `<LangProvider>`).
- `src/ui.jsx` — `Lang` context + `<T hu en [html] [as]>` helper, `useReveal`/`useTilt`
  hooks (ported from the design's kat.js, re-run on every route/lang change), `Header`,
  `Footer`, `PageHero`, `Crumb`, `CtaBand`, `Ledger`, `EnquiryForm`, `QuoteButton`.
- `src/pages.jsx` — Home, About, Services, **ServiceDetail (data-driven, 4 services in one
  component)**, References, Contact, Imprint, Privacy.
- `src/data.js` — bilingual content: `SERVICES` (01–04), `REFERENCES` (home flat list),
  `REGISTER_GROUPS` (references page, grouped). Edit copy here.
- `src/kat.css` (verbatim design system) + `src/pages.css` (page-specific styles).
- Routing is **hash-based** (`#/rolunk`, `#/konyveles`) so it works on Pages with no 404
  fallback. Links are plain `<a href="#/…">`.
- i18n: `<T>` re-renders on language change; `kat-lang` persisted in localStorage (default hu).

## Verified (2026-06-30, production build)
All 9 routes render with correct titles/sections, hash routing + scroll-to-top, HU/EN
toggle swaps + persists, Register (8 home / 8 grouped), reveals fire, form validates
(empty → 4 fields + consent invalid; valid → "Köszönjük!"), **0 JS errors**.

## TODO — real data still needed before go-live
1. Contact-form backend → email `info@katzrt.hu` (plan: Web3Forms client-side, like
   OTOBOT). The success panel currently shows without actually sending. Must not go live
   before the privacy page is finalised.
2. Legal values in `src/pages.jsx` Imprint (cégjegyzékszám, adószám, képviselő,
   tárhelyszolgáltató).
3. Final privacy-notice text in `src/pages.jsx` Privacy (currently a labelled draft).
4. Full client roster for The Register (only 8 of ~23 — `src/data.js`).
5. Photography for `.bg-ph` placeholders.
6. SEO: per-page meta/OG, sitemap, robots, AccountingService JSON-LD.

---

# Build constitution (design is decided; don't re-litigate it)

## Colour tokens — "Ocean Pearl Delight" (in :root of kat.css)
```
--onyx:#003B42;    /* deep stormy-teal — dark anchor + body text on light */
--graphite:#006D77;/* Stormy Teal — raised dark / hover / dividers on ink */
--ivory:#EDF6F9;   /* Alice Blue — ~60% light reading ground */
--bone:#F5FAFB;    /* seashell — light cards (NEVER pure #fff) */
--stone:#4E7176;   /* muted teal-grey — secondary text, tags, hairlines */
--brass:#E29578;   /* Tangerine coral — PRIMARY accent: CTA, Nyrt. markers, rules */
--aqua:#83C5BE;    /* Pearl Aqua — secondary; Register "finance" */
--almond:#FFDDD2;  /* Almond Silk — warm accent; Register "real estate" */
--teal:#006D77;    /* Stormy Teal — accent on LIGHT grounds (links, labels) */
```

## Typography
- Display **Fraunces** 700–800 · Body **Manrope** 18px/1.6 · Mono **IBM Plex Mono**
  (eyebrows, figures, Register/section numerals, sector tags ONLY). Radius 2px. Container 1180px.

## The signature — "The Register"
Client roster as a colour-coded ledger on a stormy-teal section. Sector coding is meaningful:
listed/Nyrt. = coral + ● marker; finance = aqua; real estate = almond. Reuse the numbered
motif for Services (01–04) and About milestones — numbering is always a real sequence.

## Motion (do not break)
Reveals are **transform-only (opacity stays 1)** so content is never hidden under no-JS,
print, reduced-motion, or static capture. `.rv`/`.stagger` toggled by IntersectionObserver.
3D "ledger floor" on `.ink-depth` + subtle pointer tilt (pointer:fine only). All disabled
under `prefers-reduced-motion`.

## Guardrails
- No pure-white backgrounds (use `--ivory`/`--bone`). Coral is the single primary accent;
  aqua/almond secondary — no fourth hue. Keep Fraunces/Manrope/IBM Plex Mono (fallbacks
  Spectral / Hanken Grotesk). No count-up numbers, no parallax, no theatrical motion.
  Credibility band shows TRUE facts (2000 / 25+ / 20+ / 4) — never invented figures.
