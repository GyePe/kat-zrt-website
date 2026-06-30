import React from "react";
import logo from "./kat-logo.png";

const { useState, useEffect, createContext, useContext } = React;

/* ============================================================
   Language (HU master / EN adaptation)
   ============================================================ */
const LangCtx = createContext({ lang: "hu", setLang: () => {} });
export const useLang = () => useContext(LangCtx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("kat-lang") === "en" ? "en" : "hu"; }
    catch { return "hu"; }
  });
  useEffect(() => {
    try { localStorage.setItem("kat-lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

/* <T hu en> — picks the current language.
   - plain:  <T hu="Kezdőlap" en="Home" />
   - inline HTML: <T html hu="A KAT <strong>2000-ben</strong>" en="..." />  → <span>
   - block HTML:  <T as="div" html hu="<p>…</p>" en="<p>…</p>" />            → <div> */
export function T({ hu, en, html, as }) {
  const { lang } = useLang();
  const v = lang === "en" && en != null ? en : hu;
  if (html) {
    const Tag = as || "span";
    return <Tag dangerouslySetInnerHTML={{ __html: v }} />;
  }
  if (as) { const Tag = as; return <Tag>{v}</Tag>; }
  return <>{v}</>;
}

/* ============================================================
   Motion hooks — ported from kat.js. Transform-only reveals;
   re-run on every route/lang change. Disabled for reduced motion.
   ============================================================ */
export function useReveal(dep) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [].slice.call(document.querySelectorAll(".rv, .stagger"));
    if (!els.length) return;
    const reveal = (el) => el.classList.add("in");
    if (reduce) { els.forEach(reveal); return; }
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const revealPassed = () =>
      els.forEach((el) => { if (el.getBoundingClientRect().top < vh() * 0.92) reveal(el); });

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
          else e.target.classList.remove("in");
        });
      }, { threshold: [0, 0.12], rootMargin: "0px 0px -7% 0px" });
      els.forEach((el) => io.observe(el));
    }
    revealPassed();
    const t1 = setTimeout(revealPassed, 350);
    const t2 = setTimeout(revealPassed, 2600);
    window.addEventListener("load", revealPassed);
    return () => {
      if (io) io.disconnect();
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener("load", revealPassed);
    };
  }, [dep]);
}

export function useTilt(dep) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.matchMedia("(pointer:fine)").matches) return;
    const secs = [].slice.call(document.querySelectorAll(".ink-depth"));
    const bound = [];
    secs.forEach((sec) => {
      const move = (e) => {
        const r = sec.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        sec.style.setProperty("--fx", (nx * 2.4).toFixed(2) + "deg");
        sec.style.setProperty("--fy", (ny * -2.0).toFixed(2) + "deg");
      };
      const leave = () => {
        sec.style.setProperty("--fx", "0deg");
        sec.style.setProperty("--fy", "0deg");
      };
      sec.addEventListener("pointermove", move);
      sec.addEventListener("pointerleave", leave);
      bound.push([sec, move, leave]);
    });
    return () => bound.forEach(([sec, move, leave]) => {
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
    });
  }, [dep]);
}

/* Small helper: a coral CTA button/link with the trailing arrow */
export function QuoteButton({ className = "btn btn-primary" }) {
  return (
    <a href="#/kapcsolat" className={className}>
      <T hu="Ajánlatot kérek" en="Request a quote" /> <span className="arr">→</span>
    </a>
  );
}

/* ============================================================
   Header
   ============================================================ */
const NAVLINKS = [
  { r: "/", hu: "Kezdőlap", en: "Home" },
  { r: "/rolunk", hu: "Rólunk", en: "About" },
  { r: "/szolgaltatasok", hu: "Szolgáltatások", en: "Services" },
  { r: "/referenciak", hu: "Referenciák", en: "References" },
  { r: "/kapcsolat", hu: "Kapcsolat", en: "Contact" },
];

export function Header({ route }) {
  const { lang, setLang } = useLang();
  const [menu, setMenu] = useState(false);
  useEffect(() => { setMenu(false); }, [route]);
  const active = (r) => (r === "/" ? route === "/" : route.startsWith(r));
  return (
    <header className="site">
      <div className="wrap nav">
        <a className="logo" href="#/" aria-label="KAT Zrt kezdőlap">
          <img src={logo} alt="KAT Zrt" className="logo-img" />
        </a>
        <nav className="navlinks" aria-label="Fő menü" style={menu ? { display: "flex" } : undefined}>
          {NAVLINKS.map((l) => (
            <a key={l.r} href={"#" + l.r} aria-current={active(l.r) ? "page" : undefined}>
              <T hu={l.hu} en={l.en} />
            </a>
          ))}
        </nav>
        <div className="lang-toggle" role="group" aria-label="Nyelv / Language">
          <button type="button" data-lang="hu" aria-pressed={lang === "hu"} onClick={() => setLang("hu")}>HU</button>
          <button type="button" data-lang="en" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </div>
        <a href="#/kapcsolat" className="btn btn-primary">
          <T hu="Ajánlatot kérek" en="Request a quote" />
        </a>
        <button className="menu-toggle" aria-label="Menü" onClick={() => setMenu((m) => !m)}>≡</button>
      </div>
    </header>
  );
}

/* ============================================================
   Footer
   ============================================================ */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <span className="logo"><img src={logo} alt="KAT Zrt" className="logo-img" /></span>
            <p className="tag">
              <T hu="Az Ön megbízható pénzügyi partnere 2000 óta." en="Your reliable financial partner since 2000." />
            </p>
          </div>
          <nav className="foot-links" aria-label="Lábléc menü">
            <a href="#/szolgaltatasok"><T hu="Szolgáltatások" en="Services" /></a>
            <a href="#/referenciak"><T hu="Referenciák" en="References" /></a>
            <a href="#/kapcsolat"><T hu="Kapcsolat" en="Contact" /></a>
            <a href="#/impresszum"><T hu="Impresszum" en="Imprint" /></a>
            <a href="#/adatvedelem"><T hu="Adatvédelmi tájékoztató" en="Privacy notice" /></a>
          </nav>
        </div>
        <div className="legal">
          <div className="blk"><div className="k"><T hu="Cégnév" en="Company name" /></div><div className="v">KAT Könyvszakértő, Adószakértő,<br />Tanácsadó Zrt.</div></div>
          <div className="blk"><div className="k"><T hu="Székhely" en="Registered seat" /></div><div className="v">1048 Budapest, Megyeri út 212.</div></div>
          <div className="blk"><div className="k"><T hu="Telefon" en="Phone" /></div><div className="v">+36 30 194 2034</div></div>
          <div className="blk"><div className="k"><T hu="E-mail" en="Email" /></div><div className="v">info@katzrt.hu</div></div>
        </div>
        <div className="copyright">© {year} KAT Zrt. <T hu="Minden jog fenntartva." en="All rights reserved." /></div>
      </div>
    </footer>
  );
}

/* ============================================================
   Page hero (inner pages)
   ============================================================ */
export function PageHero({ crumbs, eyebrowHu, eyebrowEn, eyebrowBrass, titleHu, titleEn, leadHu, leadEn }) {
  return (
    <section className="page-hero ink-depth">
      <div className="ledger-bg" aria-hidden="true"></div>
      <div className="bg-ph--hero" aria-hidden="true">
        <span className="bg-ph-tag"><T hu="Háttérkép — ajánlott" en="Background image — recommended" /></span>
      </div>
      <div className="wrap">
        <div className="crumbs rv">{crumbs}</div>
        <span className="eyebrow rv" style={eyebrowBrass ? { color: "var(--brass)" } : undefined}>
          <T hu={eyebrowHu} en={eyebrowEn} />
        </span>
        <h1 className="rv"><T hu={titleHu} en={titleEn} /></h1>
        <p className="lead rv"><T hu={leadHu} en={leadEn} /></p>
      </div>
    </section>
  );
}

export function Crumb({ tailHu, tailEn, mid }) {
  // Kezdőlap / [mid /] tail
  return (
    <>
      <a href="#/"><T hu="Kezdőlap" en="Home" /></a> <span className="sep">/</span>{" "}
      {mid}
      <T hu={tailHu} en={tailEn} />
    </>
  );
}

/* ============================================================
   CTA band
   ============================================================ */
export function CtaBand({ bone, titleHu, titleEn, textHu, textEn }) {
  return (
    <section className={"cta-band" + (bone ? " sec-bone" : "")}>
      <div className="wrap">
        <div className="rv">
          <h2 className="h2"><T hu={titleHu} en={titleEn} /></h2>
          <p><T hu={textHu} en={textEn} /></p>
        </div>
        <QuoteButton className="btn btn-primary rv" />
      </div>
    </section>
  );
}

/* ============================================================
   The Register — ledger (home flat list)
   ============================================================ */
export function Ledger({ items }) {
  return (
    <div className="ledger stagger">
      {items.map((r) => (
        <div key={r.id} className={"entry" + (r.listed ? " listed" : "") + (r.fam ? " " + r.fam : "")}>
          <span className="ix">{r.id}</span>
          <span className="name">
            {r.listed && <span className="marker" aria-label="Tőzsdén jegyzett"></span>}
            {r.name}
          </span>
          <span className="sector"><T hu={r.sectorHu} en={r.sectorEn} /></span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Enquiry form (controlled). Client-side validation mirrors the
   design. Not yet wired to a backend — on success shows the
   "Köszönjük!" panel. (Web3Forms hookup is a follow-up.)
   ============================================================ */
export function EnquiryForm() {
  const [v, setV] = useState({ nev: "", ceg: "", email: "", tel: "", uzenet: "" });
  const [bad, setBad] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentBad, setConsentBad] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => {
    const val = e.target.value;
    setV((s) => ({ ...s, [k]: val }));
    setBad((s) => ({ ...s, [k]: false }));
  };
  const emailOK = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const submit = (e) => {
    e.preventDefault();
    const b = {
      nev: v.nev.trim().length <= 1,
      ceg: v.ceg.trim().length <= 1,
      email: !emailOK(v.email),
      uzenet: v.uzenet.trim().length <= 4,
    };
    setBad(b);
    const cBad = !consent;
    setConsentBad(cBad);
    if (Object.values(b).some(Boolean) || cBad) return;
    setSent(true);
  };

  const fieldCls = (k) => "field" + (bad[k] ? " invalid" : "");

  return (
    <form className={"enquiry rv" + (sent ? " sent" : "")} noValidate onSubmit={submit}>
      <div className="form-body">
        <div className="field-row">
          <div className={fieldCls("nev")}>
            <label htmlFor="f-nev"><T hu="Név" en="Name" /></label>
            <input id="f-nev" name="nev" type="text" autoComplete="name" value={v.nev} onChange={set("nev")} />
            <span className="err"><T hu="Adja meg a nevét." en="Please enter your name." /></span>
          </div>
          <div className={fieldCls("ceg")}>
            <label htmlFor="f-ceg"><T hu="Cég" en="Company" /></label>
            <input id="f-ceg" name="ceg" type="text" autoComplete="organization" value={v.ceg} onChange={set("ceg")} />
            <span className="err"><T hu="Adja meg a cég nevét." en="Please enter your company name." /></span>
          </div>
        </div>
        <div className="field-row">
          <div className={fieldCls("email")}>
            <label htmlFor="f-email"><T hu="E-mail" en="Email" /></label>
            <input id="f-email" name="email" type="email" autoComplete="email" value={v.email} onChange={set("email")} />
            <span className="err"><T hu="Adja meg az e-mail-címét, hogy válaszolhassunk." en="Please enter your email so we can reply." /></span>
          </div>
          <div className="field">
            <label htmlFor="f-tel">
              <T hu="Telefon" en="Phone" /> <span className="opt">(<T hu="nem kötelező" en="optional" />)</span>
            </label>
            <input id="f-tel" name="tel" type="tel" autoComplete="tel" value={v.tel} onChange={set("tel")} />
            <span className="err"></span>
          </div>
        </div>
        <div className={fieldCls("uzenet")}>
          <label htmlFor="f-uzenet"><T hu="Miben segíthetünk?" en="How can we help?" /></label>
          <textarea id="f-uzenet" name="uzenet" value={v.uzenet} onChange={set("uzenet")}></textarea>
          <span className="err"><T hu="Írjon néhány mondatot, hogy pontos ajánlatot adhassunk." en="Please write a few sentences so we can quote accurately." /></span>
        </div>
        <div className={"consent" + (consentBad ? " invalid" : "")}>
          <input id="f-consent" type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentBad(false); }} />
          <label htmlFor="f-consent">
            <T
              html
              hu='Hozzájárulok, hogy a KAT Zrt. a megkeresésem megválaszolása céljából kezelje a megadott adataimat. Részletek: <a href="#/adatvedelem">Adatvédelmi tájékoztató</a>.'
              en='I consent to KAT Zrt. processing my data to respond to my enquiry. Details: <a href="#/adatvedelem">Privacy notice</a>.'
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          <T hu="Ajánlatot kérek" en="Request a quote" /> <span className="arr">→</span>
        </button>
      </div>
      <div className="form-success">
        <div className="chk" aria-hidden="true">✓</div>
        <h3><T hu="Köszönjük!" en="Thank you!" /></h3>
        <p><T hu="Egy munkanapon belül válaszolunk a megadott e-mail-címen." en="We'll reply within one business day at the email you provided." /></p>
      </div>
    </form>
  );
}
