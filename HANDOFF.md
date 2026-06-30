# Handoff: KAT Zrt — Corporate Website

## Overview
A bilingual (Hungarian master / English) marketing website for **KAT Zrt.**, a Budapest accounting, payroll, advisory and tax firm. The site's strategic job: make a first-time visitor (a CFO / finance director / owner) feel that this firm operates at a higher level of seriousness than a typical bookkeeper — the proof being its roster of listed companies (Nyrt.), asset managers and an OTP subsidiary. The signature element is **"The Register"**: the client list rendered as an authoritative, color-coded ledger.

The single primary action across the whole site is **"Ajánlatot kérek" / "Request a quote"** (an enquiry that should email `info@katzrt.hu`).

## About the design files
The files in this bundle are **design references built in plain HTML/CSS/JS**. They are *high-fidelity and functional* (the nav, language toggle, scroll motion, the Register, and the contact-form validation all work in a browser), but they are **not wired to a backend** and were authored as a design source of truth.

Your task: **recreate these designs in the target environment.** Two viable paths:
1. **Ship as a static site** — the HTML/CSS/JS here is clean, accessible and close to production. You'd mainly add the contact-form backend, real content/data, and the legal pages' real values.
2. **Rebuild in a framework (recommended for longevity)** — Next.js (App Router) + TypeScript + **next-intl** for the HU/EN i18n, recreating these layouts pixel-for-pixel with the tokens in this doc. Keep the three typefaces and the exact color tokens.

Either way, treat `kat.css` as the canonical design system and this README + `CLAUDE.md` as the spec.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion and copy are all here and intended to be reproduced exactly. Hex values, the type scale, and motion timings in the "Design Tokens" and "Interactions" sections are authoritative.

---

## Pages / Views

All pages share one sticky ink header (logo · nav · HU|EN toggle · coral CTA) and one ink footer (logo + tagline, link nav, legal block, copyright). Filenames are ASCII, lowercase; links are relative.

| File | Name (HU / EN) | Purpose |
|---|---|---|
| `index.html` | Kezdőlap / Home | One-screen convince + route to enquiry. Hero, 4-service register, credibility band, short About, **The Register**, contact section with form. |
| `rolunk.html` | Rólunk / About | Founding story (2000 → Zrt 2008), three principles, facts band. |
| `szolgaltatasok.html` | Szolgáltatások / Services | Numbered register (01–04) linking to the four detail pages. |
| `konyveles.html` | Könyvelés / Accounting | Service detail: intro, "what's included", who-it's-for + cadence cards, prev/next. |
| `berszamfejtes.html` | Bérszámfejtés / Payroll | Service detail (same template). |
| `tanacsadas.html` | Tanácsadás / Advisory | Service detail (same template). |
| `adotanacsadas.html` | Adótanácsadás / Tax advisory | Service detail (same template). |
| `referenciak.html` | Referenciák / References | The full Register, grouped by sector with the color legend. |
| `kapcsolat.html` | Kapcsolat / Contact | Contact details, map placeholder + Google-Maps link, working enquiry form. |
| `impresszum.html` | Impresszum / Imprint | Legal company data (values are placeholders — see TODO). |
| `adatvedelem.html` | Adatvédelmi tájékoztató / Privacy notice | GDPR notice (draft text — see TODO). |

### Layout system
- Content column: `max-width: 1180px`, side padding `clamp(20px, 5vw, 72px)` (`--gutter`), centered (`.wrap`).
- Section vertical rhythm: `padding-block: clamp(64px, 8vw, 108px)` (`.sec`).
- A deliberate **ink → light → ink → light** spine: dark stormy-teal anchors (header, hero, the Register, footer) bookend warm/airy Alice-Blue reading sections.

### The signature: "The Register"
The references are a typed data array rendered as an indexed ledger on a dark (stormy-teal) "vault" section:
- Mono index numeral (`001`…), client name in Fraunces (ivory), small-caps sector tag (mono).
- **Sectors are color-coded** (this is the meaningful use of the extended palette):
  - **Listed / Nyrt.** → coral (`--brass`), and these entries get a small brass/coral ● marker before the name.
  - **Finance** → aqua (`--aqua`).
  - **Real estate · asset management** → almond (`--almond`).
- A legend above the ledger maps the three colors. Hairline coral rules separate entries; on hover the row ground lifts to `--graphite` and a left accent bar (the entry's family color) grows in.
- The same numbered-register motif is reused for Services (`01`–`04`) and the About milestones — the numbering is always a real, countable sequence, never decoration.

Data shape (see `index.html` inline `<script>` and recreate as a typed array, e.g. `src/data/references.ts`):
```js
{ id: "003", name: "AKKO Invest Nyrt.", sector: "TŐZSDEI / NYRT.", listed: true }
```
Family is derived from the sector text: contains `PÉNZÜGY` → finance (aqua); contains `INGATLAN` → real estate (almond); `listed:true` → coral. English sector labels are mapped in the `SECEN` object in `index.html`.

---

## Interactions & behavior

### Language toggle (HU master / EN)
- A **HU | EN** segmented control is injected into every header by `kat.js`. Choice persists in `localStorage` under key `kat-lang` and applies across pages. Default = `hu`.
- Mechanism: every translatable element carries a `data-en="..."` attribute holding its English HTML; `kat.js` swaps `innerHTML` between the original (cached into `data-hu`) and `data-en`. The `<title>` swaps via `data-en-title` on `<body>`. `<html lang>` updates too.
- English is an **adaptation, not a literal translation** (foreground categories over Hungarian client-name recognition; gloss legal forms once: Nyrt. = publicly listed plc, Zrt. = private ltd by shares, Kft. = limited liability company). Company names, the firm name, and addresses are **not** translated.
- If rebuilding in Next.js, replace this attribute-swap with **next-intl** message catalogs (`hu` default + `en`), routes `/` (hu) and `/en`.

### Motion (all in `kat.css` + `kat.js`)
**Critical engineering note:** reveals are **transform-only — opacity always stays 1.** Content is therefore never hidden if JS is disabled, in print, under `prefers-reduced-motion`, or during static capture. (An earlier opacity-fade approach left content stranded invisible in some render contexts.) Preserve this principle.

- **Scroll reveals (reversible):** elements with class `.rv` start at `transform: translateY(26px)` and transition to `none` when `.in` is added; `.stagger > *` children start at `translateY(18px)` with per-child `transition-delay` (`.03s`→`.64s`). An `IntersectionObserver` in `kat.js` adds `.in` on enter and **removes** it on full exit, so animations replay as you scroll back and forth. Transition: `transform .7s cubic-bezier(.2,.75,.25,1)`.
- **Hero / page-hero choreography:** above-the-fold `.rv` children start at `translateY(32px)`, revealed on load with staggered delays `.05 / .15 / .27 / .39 / .49s`, `transform .8s`.
- **Brass/coral underline:** `.hero .brass-underline` draws in via `transform: scaleX(0) → scaleX(1)`, `.85s`, delay `.35s`, `transform-origin: left`.
- **3D textured ground (`.ink-depth`):** on dark sections, a `::before` dichromatic atmospheric glow (coral + stormy-teal + aqua radials) and a `::after` receding perspective "ledger floor" (`perspective(460px) rotateX(64deg)`, coral hairline grid, masked fade). A subtle **pointer tilt** (`kat.js`, `pointer:fine` only, disabled for reduced-motion) nudges the floor ±~2.4°/2° via CSS custom props `--fx` / `--fy`.
- **Hover micro-interactions (CSS transitions, ~.25–.4s):** nav-link brass underline wipe; primary button lift + shadow; service/register rows grow a left accent bar + index warms to the accent color; cards lift with a deeper shadow; stat-tile numerals warm to teal on hover.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces `transform:none`, disables transitions, the floor, and the form-success pop.
- **Paper grain:** light surfaces carry a low-opacity SVG fractal-noise tile (`--grain`) via `background-blend-mode: multiply`.

### Contact form (`kapcsolat.html` + the home contact section)
- Client-side validation in `kat.js`: required Név, Cég, valid E-mail, Üzenet ≥ 5 chars, **required GDPR consent checkbox**. Invalid fields get `.invalid` (red border + message). On success the form swaps to a "Köszönjük!" panel with an animated checkmark.
- **Not wired to a backend.** Implementation needs: a server action / endpoint emailing `info@katzrt.hu` (e.g. Resend or SMTP), a honeypot + basic rate-limit, and the form must **not** go live before the real privacy-policy page exists.
- Map: a striped placeholder + an "Útvonalterv / Directions" link to Google Maps (intentionally no embedded map, to minimize third-party cookies). Swap for a static map image or click-to-load embed if desired.

### Responsive
- `≤ 1080px`: primary nav collapses to a `≡` menu button (the HU/EN toggle + CTA remain). The menu button toggles `.navlinks` display (basic; a developer should build a proper mobile drawer).
- `≤ 860px`: multi-column grids (services, tiles, detail, contact, register head) stack to one column; type steps down to 17px base.

---

## State management
Minimal, all client-side in `kat.js`:
- `kat-lang` (localStorage): `'hu' | 'en'` — current language.
- Reveal `.in` classes: toggled by IntersectionObserver (transient, not persisted).
- Form: `.invalid` per-field flags; `.sent` on the form element for the success state.
- In a framework rebuild: language → next-intl/router; form → server action + form state; reveals → an intersection hook or a library (e.g. Framer Motion) but keep the "resting state visible" rule.

---

## Design tokens

### Palette — "Ocean Pearl Delight"
Defined as CSS custom properties in `:root` (`kat.css`). Token *names* are legacy (from an earlier ink/brass system); only their *values* are the ocean palette — keep names or rename consistently.

| Token | Hex | Palette name | Role |
|---|---|---|---|
| `--onyx` | `#003B42` | (deep Stormy Teal) | Dark anchor: header, hero, Register, footer; **primary text on light** |
| `--graphite` | `#006D77` | Stormy Teal | Raised dark surface / row hover / dividers on ink |
| `--ivory` | `#EDF6F9` | Alice Blue | ~60% light reading ground (body background) |
| `--bone` | `#F5FAFB` | seashell white | Lighter light cards / form / band (never pure #fff) |
| `--stone` | `#4E7176` | (muted teal-grey) | Secondary text, sector tags, hairlines |
| `--brass` / `--coral` | `#E29578` | Tangerine Dream | **Primary accent**: CTA fill, Nyrt. markers, key rules, focus |
| `--aqua` | `#83C5BE` | Pearl Aqua | Secondary accent; Register "finance" sector (reads on dark) |
| `--almond` | `#FFDDD2` | Almond Silk | Warm soft accent; Register "real estate" sector |
| `--teal` | `#006D77` | Stormy Teal | Accent on **light** grounds (links, small labels, hovers) |

Source palette (for reference): Stormy Teal `#006D77`, Pearl Aqua `#83C5BE`, Alice Blue `#EDF6F9`, Almond Silk `#FFDDD2`, Tangerine Dream `#E29578`.

**Contrast rules (keep AA):** primary text = `--onyx` on `--ivory` (~12:1). On dark surfaces use white/Alice (`~12:1`), aqua (`~6:1`), coral (`~5:1`), almond (`~9:1`). **Coral on light is large/graphic-only (~2.2:1)** — never small body text; for emphasis/labels on light use `--teal` (`#006D77`, ~5.3:1) or `--onyx`. Primary CTA = coral fill + `--onyx` label (~5.3:1). Coral button hover = `#cf7e5f`.

### Typography (Google Fonts)
- **Display — Fraunces** (variable, optical sizing), weights 700–800. Used large for H1/H2 and Register names.
- **Body — Manrope**, weights 300 / 400 / 500 / 600. Base 18px, line-height 1.6.
- **Mono — IBM Plex Mono**, 400/500. Used ONLY for eyebrows, figures, Register/section index numerals, sector tags, and labels.
- Import: `Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800` · `Manrope:wght@300;400;500;600` · `IBM+Plex+Mono:wght@400;500`.

Type scale (clamps): `.display` `clamp(40px,6.4vw,74px)`/800; page-hero `h1` `clamp(38px,5.6vw,66px)`/800; `.h2` `clamp(30px,4vw,46px)`/700; `.lede` `clamp(19px,2.1vw,24px)`/300; eyebrow 12.5px mono, `letter-spacing:.22em`, uppercase. Headings `letter-spacing:-.015em` to `-.02em`.

### Spacing / radius / misc
- Container `--maxw: 1180px`; gutter `clamp(20px,5vw,72px)`.
- Border radius: **2px** (buttons, inputs), 3px (image placeholders) — deliberately crisp, low-rounding.
- Buttons: padding `15px 26px`, weight 600, 16px; nav CTA `10px 20px`/14.5px.
- Hairlines: `color-mix(in srgb, var(--stone) ~30%, transparent)` on light; `color-mix(... var(--brass) ~28%, transparent)` on the Register.
- Shadows: soft, low — cards `0 20px 44px -32px rgba(21,22,26,.5)` + `inset 0 1px 0 rgba(255,255,255,.6)`.
- Breakpoints: 1080px (nav collapse), 860px (stack).

### Background-image placeholders
Where real photography should be dropped in (marked with dashed striped fills + mono labels — replace with `<img>`/`background-image`):
- `.bg-ph--hero` — a faint aqua-striped cover layer on **every hero / page-hero** (label "Háttérkép — ajánlott"). Intended: a hero/brand background photo behind the headline (apply a teal overlay for text legibility).
- `.bg-ph--wide` — a wide framed block under the home **About** section (label: team / Budapest office photo).
- `.map-ph` — the contact map slot.

---

## Assets
- `kat-logo.png` — the official KAT white wordmark (1000×536, transparent PNG, supplied by the client). Used in the header (`height:30px`) and footer (`height:40px`); it sits on the dark stormy-teal surfaces. No other raster assets — all texture/depth is CSS/SVG-generated.
- Fonts via Google Fonts (above).

## Files in this bundle
- `index.html`, `rolunk.html`, `szolgaltatasok.html`, `konyveles.html`, `berszamfejtes.html`, `tanacsadas.html`, `adotanacsadas.html`, `referenciak.html`, `kapcsolat.html`, `impresszum.html`, `adatvedelem.html` — the pages.
- `kat.css` — the complete design system (tokens, components, motion, responsive). **Canonical.**
- `kat.js` — shared behavior (reveal observer, language toggle, mobile menu, year stamp, form validation, pointer tilt, ledger renderer).
- `kat-logo.png` — logo.
- `CLAUDE.md` — a condensed "build constitution" of fixed decisions; paste into the target repo.

> Asset cache-busting: HTML currently references `kat.css?v=6` / `kat.js?v=6`. Drop the query string in a real build pipeline.

---

## TODO — real data the owner still must supply
These are intentionally placeholders in the design:
1. **Full client roster** — only ~8 of the ~23 clients are listed; the Register data array is built to extend.
2. **Legal values** for `impresszum.html` — cégjegyzékszám, adószám, képviselő, tárhelyszolgáltató (currently "megadás alatt").
3. **Final privacy-notice text** for `adatvedelem.html` (current text is a labeled draft) — must exist before the form goes live.
4. **Photography** for the background-image placeholders.
5. **Contact-form backend** (email to `info@katzrt.hu`) + spam protection.
6. **SEO** if migrating from the old site: ensure indexing is allowed; add metadata, sitemap, robots, OG tags, and `AccountingService`/`ProfessionalService` JSON-LD.

## Known contacts / facts baked into the design
Phone `+36 30 194 2034` · email `info@katzrt.hu` · seat `1048 Budapest, Megyeri út 212.` · founded 2000, Zrt since 2008 · legal name (to confirm) "KAT Könyvszakértő, Adószakértő, Tanácsadó Zrt."
