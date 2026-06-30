# KAT Zrt. website — notes for Claude

Bilingual (HU master / EN) marketing site for a Budapest accounting/payroll/tax firm.
**Static, multi-page HTML/CSS/JS — no build step.** The files in this repo are the
design source of truth from the Claude Design handoff (`HANDOFF.md`). Ship/maintain
them as static files. `kat.css` is the canonical design system.

## Project facts
- **Repo:** `GyePe/kat-zrt-website` (public). Local: `C:\dev\kat-zrt-website` (kept out
  of OneDrive on purpose — OneDrive sync fights dev tooling).
- **Hosting:** GitHub Pages, **deploy from branch** (`main`, root). Push to `main` → live.
  No Vite/build, no Actions workflow. `.nojekyll` makes Pages serve files as-is.
  Live: https://gyepe.github.io/kat-zrt-website/
- **GitHub account:** GyePe. Commit as `290713436+GyePe@users.noreply.github.com`.
- `gh` at `C:\Program Files\GitHub CLI\gh.exe`; Node at `C:\Program Files\nodejs\`
  (not always on PATH in open shells).
- Decision (2026-06-30): ship the design static rather than rebuild in React — max
  fidelity, simplest, and goes live without needing the `workflow` token scope.

## Known facts baked into the design
Phone `+36 30 194 2034` · email `info@katzrt.hu` · seat `1048 Budapest, Megyeri út 212.`
· founded 2000, Zrt. since 2008 · legal name "KAT Könyvszakértő, Adószakértő, Tanácsadó Zrt."

## TODO — real data still needed before go-live
1. Contact-form backend → email `info@katzrt.hu` (plan: Web3Forms client-side, like
   OTOBOT). Form must NOT go live before the privacy page is finalised.
2. Legal values in `impresszum.html` (cégjegyzékszám, adószám, képviselő, tárhelyszolgáltató).
3. Final privacy-notice text in `adatvedelem.html` (currently a labelled draft).
4. Full client roster for The Register (only 8 of ~23 listed).
5. Photography for `.bg-ph` placeholders (hero on every page + wide About block).
6. SEO: per-page meta description, OG/Twitter, sitemap, robots, AccountingService JSON-LD.

---

# Build constitution (design is decided; don't re-litigate it)

The reference implementation is the HTML/CSS/JS here — `kat.css` is canonical.

## Colour tokens — "Ocean Pearl Delight" (in :root)
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
- Display: **Fraunces** 700–800, large (H1 `clamp(38–74px)`), optical sizing on.
- Body: **Manrope**, base 18px / line-height 1.6.
- Mono: **IBM Plex Mono** — eyebrows, figures, Register/section index numerals, sector
  tags ONLY.
- Crisp corners: border-radius 2px. Container max 1180px, gutter `clamp(20px,5vw,72px)`.

## Contrast (verified — keep AA)
- Body = `--onyx` on `--ivory` (~12:1). On dark: white/Alice ~12:1, aqua ~6:1, coral ~5:1, almond ~9:1.
- **Coral on light is large/graphic-only** (~2.2:1) — never small text; emphasis on light
  = `--teal` or `--onyx`. Primary CTA = coral fill + `--onyx` label (~5.3:1). Coral hover `#cf7e5f`.

## The signature — "The Register"
References live as a typed data array; rendered as an indexed ledger on a stormy-teal
section: mono index, Fraunces name, mono sector tag, hairline rules. **Sector colour-coding
is meaningful, not decorative:** listed/Nyrt. = coral + ● marker; finance = aqua; real
estate = almond. A legend maps the three. Reuse the numbered-register motif for Services
(01–04) and About milestones — numbering must always be a real, countable sequence.

## Motion (do not break)
- **Reveals are TRANSFORM-ONLY (opacity stays 1)** so content is never hidden with no-JS,
  in print, under reduced-motion, or in static capture. Keep this principle.
- `.rv` → translateY in; `.stagger>*` → staggered children; reversible via
  IntersectionObserver toggling `.in`. Hero choreography on load; coral underline draws via scaleX.
- 3D "ledger floor": `.ink-depth::after` perspective grid + `::before` glow; subtle pointer
  tilt (`pointer:fine` only). All disabled under `prefers-reduced-motion`.

## i18n
- Every translatable node carries `data-en`; `kat.js` swaps innerHTML and persists
  `kat-lang` in localStorage (default `hu`). Do NOT translate: company/brand names in the
  Register, the firm name, Hungarian addresses. Gloss legal forms once (Nyrt./Zrt./Kft.).

## Forbidden / guardrails
- No pure-white (#fff) backgrounds — use `--ivory` / `--bone`.
- Coral is the single primary accent; aqua/almond are secondary. Don't add a fourth hue.
- Don't substitute the typefaces with Inter/Roboto/Arial/system. Fallbacks:
  Fraunces→Spectral, Manrope→Hanken Grotesk.
- No count-up number animations, no parallax, no bouncy/theatrical motion. Credibility band
  shows TRUE facts (2000 / 25+ / 20+ / 4) — never invented K/M/% figures.
