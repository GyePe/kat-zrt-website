# KAT Zrt. — website

Bilingual (Hungarian master / English) marketing website for **KAT Könyvszakértő,
Adószakértő, Tanácsadó Zrt.**, a Budapest accounting · payroll · advisory · tax firm.

It is a **static, multi-page site** — plain HTML/CSS/JS, no build step. The pages are
the design source of truth from the Claude Design handoff (see `HANDOFF.md`), shipped
as-is. Hosted on **GitHub Pages** (deploy from the `main` branch).

## Structure

```
index.html            Home (hero, services, credibility band, About, The Register, contact form)
rolunk.html           About
szolgaltatasok.html   Services index (01–04)
konyveles.html        Accounting   ┐
berszamfejtes.html    Payroll      │ four service detail pages
tanacsadas.html       Advisory     │ (shared template)
adotanacsadas.html    Tax advisory ┘
referenciak.html      References ("The Register", grouped by sector)
kapcsolat.html        Contact (details, map placeholder, enquiry form)
impresszum.html       Imprint (legal company data)
adatvedelem.html      Privacy notice (GDPR)

kat.css               Complete design system (tokens, components, motion, responsive) — canonical
kat.js                Shared behaviour (reveal observer, HU/EN toggle, mobile menu, form validation, ledger)
kat-logo.png          White wordmark (header + footer)
.nojekyll             Serve files as-is on GitHub Pages (no Jekyll processing)

HANDOFF.md            The original design handoff spec (reference)
CLAUDE.md             Build constitution + project notes for Claude
```

## Run locally

It's static — just open `index.html` in a browser. For a proper local server (so
relative links and `fetch` behave exactly like production):

```bash
# any static server, e.g.
npx serve .
# or
python -m http.server 8000
```

## Deploy

GitHub Pages is set to **deploy from branch** (`main`, root). Push to `main` and the
live site updates automatically — no build, no Actions workflow.

Live URL: https://gyepe.github.io/kat-zrt-website/

## Before go-live — real data still needed

See `CLAUDE.md` and `HANDOFF.md` for the full list. The big ones:
1. **Contact-form backend** — wire the enquiry form to email `info@katzrt.hu`
   (planned via Web3Forms, client-side, like the OTOBOT site). The form must not go
   live before the privacy page is final.
2. **Legal values** in `impresszum.html` — cégjegyzékszám, adószám, képviselő,
   tárhelyszolgáltató (currently "megadás alatt").
3. **Final privacy text** in `adatvedelem.html` (currently a labelled draft).
4. **Full client roster** for The Register (only 8 of ~23 shown).
5. **Photography** for the `.bg-ph` placeholders.
6. **SEO** — per-page meta description, OG tags, sitemap, robots, JSON-LD.
