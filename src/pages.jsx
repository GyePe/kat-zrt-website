import React from "react";
import { T, PageHero, Crumb, CtaBand, Ledger, EnquiryForm, QuoteButton } from "./ui.jsx";
import { SERVICES, REFERENCES, REGISTER_GROUPS } from "./data.js";

/* Shared CTA-band copy used by several pages */
const QUOTE_TEXT = {
  hu: "Mondja el néhány mondatban a helyzetet, és egy munkanapon belül összeállítjuk az ajánlatunkat.",
  en: "Tell us about your situation in a few sentences and we'll put together a quote within one business day.",
};

/* The three-colour legend (home + references) */
function Legend({ style }) {
  return (
    <div className="legend rv" style={style}>
      <span className="legend-item"><span className="dot" aria-hidden="true"></span> <T as="span" hu="Tőzsdei (Nyrt.)" en="Listed (Nyrt.)" /></span>
      <span className="legend-item"><span className="dot fin" aria-hidden="true"></span> <T as="span" hu="Pénzügy" en="Finance" /></span>
      <span className="legend-item"><span className="dot re" aria-hidden="true"></span> <T as="span" hu="Ingatlan · vagyonkezelés" en="Real estate · asset mgmt" /></span>
    </div>
  );
}

/* The four credibility tiles (home + about) */
function Tiles() {
  return (
    <div className="tiles stagger">
      <div className="tile"><div className="num">2000</div><div className="lab"><T hu="óta a partnerük" en="as your partner" /></div></div>
      <div className="tile"><div className="num">25+</div><div className="lab"><T hu="év tapasztalat" en="years of experience" /></div></div>
      <div className="tile"><div className="num">20+</div><div className="lab"><T hu="vállalati ügyfél" en="corporate clients" /></div></div>
      <div className="tile"><div className="num">4</div><div className="lab"><T hu="szakterület egy helyen" en="disciplines, one roof" /></div></div>
    </div>
  );
}

/* ============================================================ HOME */
export function Home() {
  return (
    <>
      <section className="hero ink-depth" id="top">
        <div className="ledger-bg" aria-hidden="true"></div>
        <div className="bg-ph--hero" aria-hidden="true"><span className="bg-ph-tag"><T hu="Háttérkép — ajánlott" en="Background image — recommended" /></span></div>
        <div className="wrap">
          <span className="eyebrow rv"><T hu="KÖNYVELÉS · BÉRSZÁMFEJTÉS · ADÓTANÁCSADÁS" en="ACCOUNTING · PAYROLL · TAX ADVISORY" /></span>
          <h1 className="display rv"><T hu="Megbízható pénzügyi partner cégeknek, 2000 óta." en="Your reliable financial partner — trusted by listed Hungarian companies since 2000." /></h1>
          <span className="brass-underline rv" aria-hidden="true"></span>
          <p className="sub lede rv"><T hu="Tőzsdén jegyzett társaságok, vagyonkezelők és vezető hazai cégek bízzák ránk a könyvelésüket, bérszámfejtésüket és adózásukat." en="Publicly listed companies, asset managers and leading Hungarian businesses trust us with their accounting, payroll and tax." /></p>
          <div className="cta-row rv">
            <QuoteButton className="btn btn-primary" />
            <a href="#/szolgaltatasok" className="btn btn-ghost-light"><T hu="Szolgáltatásaink" en="Our services" /></a>
          </div>
        </div>
      </section>

      <section className="sec sec-ivory" id="szolgaltatasok">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><T hu="Szolgáltatásaink" en="Our services" /></span>
            <h2 className="h2"><T html hu="Négy szakterület,<br />egy felelős partner." en="Four disciplines,<br />one accountable partner." /></h2>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <a key={s.slug} className="svc rv" href={"#/" + s.slug}>
                <span className="idx">{s.idx}</span>
                <div>
                  <h3><T hu={s.nameHu} en={s.nameEn} /></h3>
                  <p><T hu={s.shortHu} en={s.shortEn} /></p>
                  <span className="more"><T hu="Részletek" en="Details" /> <span className="arr">→</span></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="intro rv"><T html hu="Egy helyen egyesítjük a könyvelés, a bérszámfejtés és az adótanácsadás szaktudását — <strong>hogy partnereinknek ne kelljen több szolgáltatót összehangolniuk.</strong>" en="We bring the expertise of accounting, payroll and tax advisory together in one place — <strong>so our clients don't have to coordinate several vendors.</strong>" /></p>
          <Tiles />
        </div>
      </section>

      <section className="sec sec-ivory" id="magunkrol">
        <div className="wrap about-grid">
          <div className="rv">
            <span className="eyebrow"><T hu="Magunkról" en="About us" /></span>
            <h2><T hu="Tapasztalt csapat, amelyik beszél is Önnel." en="An experienced team that actually talks to you." /></h2>
          </div>
          <div className="about-body rv">
            <p><T html hu="A KAT 2000-ben alakult, és <strong>2008 óta működik részvénytársaságként.</strong> Azóta egyetlen elvet tartunk a középpontban: a munkánk minőségével a lehető legmagasabb szinten szolgáljuk ki ügyfeleinket." en="KAT was founded in 2000 and has operated as a company limited by shares (Zrt.) <strong>since 2008.</strong> One principle has stayed at the centre ever since: to serve our clients at the highest possible level through the quality of our work." /></p>
            <p><T html hu="Munkatársainkat folyamatosan képezzük, partnereinket pedig <strong>rendszeresen, teljes körűen tájékoztatjuk</strong> — így a számok mögött mindig ott a magyarázat is." en="We train our staff continuously and keep our clients informed <strong>regularly and in full</strong> — so the numbers always come with the explanation." /></p>
            <a href="#/rolunk" className="btn btn-ghost-dark"><T hu="Rólunk bővebben" en="More about us" /> <span className="arr">→</span></a>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "clamp(40px,5vw,64px)" }}>
          <div className="bg-ph bg-ph--wide rv" aria-hidden="true"><span className="bg-ph-tag"><T hu="Háttér- / illusztrációs kép — a csapat vagy a budapesti iroda" en="Background / feature image — the team or the Budapest office" /></span></div>
        </div>
      </section>

      <section className="register ink-depth" id="referenciak">
        <div className="wrap">
          <div className="reg-head">
            <div className="rv">
              <span className="eyebrow"><T hu="Referenciák" en="References" /></span>
              <h2><T hu="Akik ránk bízzák a számaikat." en="Who trusts us with their books." /></h2>
            </div>
            <p className="reg-intro rv"><T hu="Partnereinket rendszeres és teljes körű tájékoztatással segítjük a fejlődésükben. Néhányan közülük:" en="We support our clients' growth with regular, full reporting. A few of them:" /></p>
          </div>
          <Legend />
          <Ledger items={REFERENCES} />
          <p className="reg-foot rv"><T hu="001–008 · a teljes jegyzék a Referenciák oldalon" en="001–008 · the full register on the References page" /></p>
        </div>
      </section>

      <section className="sec sec-ivory contact" id="kapcsolat">
        <div className="wrap contact-grid">
          <div className="rv">
            <span className="eyebrow"><T hu="Kapcsolat" en="Contact" /></span>
            <h2><T hu="Beszéljük át, mire van szüksége a cégének." en="Let's talk about what your company needs." /></h2>
            <p className="copy"><T hu="Mondja el néhány mondatban, mivel foglalkoznak, és egy munkanapon belül összeállítjuk az ajánlatunkat." en="Tell us in a few sentences what you do, and we'll put together a quote within one business day." /></p>
            <div className="contact-meta">
              <div className="row"><span className="k"><T hu="Telefon" en="Phone" /></span><span className="v">+36 30 194 2034</span></div>
              <div className="row"><span className="k"><T hu="E-mail" en="Email" /></span><span className="v">info@katzrt.hu</span></div>
              <div className="row"><span className="k"><T hu="Cím" en="Address" /></span><span className="v">1048 Budapest, Megyeri út 212.</span></div>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}

/* ============================================================ ABOUT */
export function About() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Rólunk" tailEn="About" />}
        eyebrowHu="Magunkról" eyebrowEn="About us"
        titleHu="Tapasztalt csapat, amelyik beszél is Önnel." titleEn="An experienced team that actually talks to you."
        leadHu="Több mint két évtizede ugyanazzal az igénnyel dolgozunk: pontos könyveléssel és tiszta magyarázattal állunk a cégek mellett — a kisebb vállalkozásoktól a tőzsdén jegyzett társaságokig."
        leadEn="For more than two decades we've worked to one standard: accurate books and a clear explanation, for companies of every size — from growing SMEs to publicly listed (Nyrt.) groups."
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="detail-grid">
            <div className="rv">
              <span className="eyebrow" style={{ color: "var(--stone)", display: "block", marginBottom: 18 }}><T hu="A cég" en="The firm" /></span>
              <h2 className="h2"><T hu="Egy elv, 2000 óta." en="One principle, since 2000." /></h2>
            </div>
            <div className="prose rv">
              <p><T html hu="<strong>A KAT 2000-ben alakult</strong>, és <strong>2008 óta működik részvénytársaságként.</strong> Azóta egyetlen elvet tartunk a középpontban: a munkánk minőségével a lehető legmagasabb szinten szolgáljuk ki ügyfeleinket." en="KAT was founded in 2000 and has operated as a company limited by shares (Zrt.) <strong>since 2008.</strong> One principle has stayed at the centre ever since: to serve our clients at the highest possible level through the quality of our work." /></p>
              <p><T hu="A könyvelés, a bérszámfejtés, a tanácsadás és az adószakértés négy szakterületét egy helyen, egy felelős partnerként kínáljuk — így ügyfeleinknek nem kell több szolgáltatót összehangolniuk, és mindig tudják, kihez fordulhatnak." en="Accounting, payroll, advisory and tax expertise — four disciplines under one roof, one accountable partner. Clients don't have to coordinate several vendors, and they always know who to turn to." /></p>
              <p><T hu="Munkatársainkat folyamatosan képezzük, hogy lépést tartsunk a változó számviteli és adózási szabályokkal — partnereinket pedig rendszeresen, teljes körűen tájékoztatjuk. Nálunk a számok mögött mindig ott a magyarázat is." en="We train our staff continuously to keep pace with changing accounting and tax rules — and we keep our clients informed, regularly and in full. With us, the numbers always come with the explanation." /></p>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><T hu="Ahogy dolgozunk" en="How we work" /></span>
            <h2 className="h2"><T hu="Három dolgot ígérünk." en="We promise three things." /></h2>
          </div>
          <div className="principles stagger">
            <div className="principle"><div className="n">01</div><h3><T hu="Rendszeres, teljes körű tájékoztatás" en="Regular, full reporting" /></h3><p><T hu="Nem csak a határidőkre figyelünk. Érthetően elmondjuk, mit jelentenek a számok, és időben szólunk, ha valami döntést kíván." en="We don't just watch deadlines. We explain what the numbers mean, in plain terms, and flag anything that needs a decision in good time." /></p></div>
            <div className="principle"><div className="n">02</div><h3><T hu="Folyamatosan képzett csapat" en="A continuously trained team" /></h3><p><T hu="A jogszabályok változnak; mi velük együtt. Munkatársaink képzése folyamatos, hogy a tanácsunk mindig naprakész legyen." en="The rules change; so do we. Our team trains continuously, so our advice is always current." /></p></div>
            <div className="principle"><div className="n">03</div><h3><T hu="Egy felelős partner" en="One accountable partner" /></h3><p><T hu="Könyvelés, bérszámfejtés, tanácsadás és adószakértés egy kézben. Egy kapcsolattartó, aki átlátja a cége teljes pénzügyi képét." en="Accounting, payroll, advisory and tax in one place. A single point of contact who sees your company's whole financial picture." /></p></div>
          </div>
        </div>
      </section>
      <section className="sec sec-ivory" style={{ paddingBlock: "clamp(54px,7vw,84px)" }}>
        <div className="wrap"><Tiles /></div>
      </section>
      <CtaBand bone
        titleHu="Beszéljük át, mire van szüksége a cégének." titleEn="Let's talk about what your company needs."
        textHu={QUOTE_TEXT.hu} textEn={QUOTE_TEXT.en}
      />
    </>
  );
}

/* ============================================================ SERVICES (index) */
export function Services() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Szolgáltatások" tailEn="Services" />}
        eyebrowHu="Szolgáltatásaink" eyebrowEn="Our services"
        titleHu="Négy szakterület, egy felelős partner." titleEn="Four disciplines, one accountable partner."
        leadHu="A könyveléstől az adótanácsadásig minden egy helyen. Válassza ki, mire van szüksége a cégének — a részletekért nyissa meg az adott szakterületet."
        leadEn="From accounting to tax advisory, everything in one place. Choose what your company needs — open a discipline for the details."
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="reg-list stagger">
            {SERVICES.map((s) => (
              <a key={s.slug} className="reg-row" href={"#/" + s.slug}>
                <span className="idx">{s.idx}</span>
                <div className="ttl"><h3><T hu={s.nameHu} en={s.nameEn} /></h3><p><T hu={s.rowHu} en={s.rowEn} /></p></div>
                <span className="go"><T hu="Részletek" en="Details" /> <span className="arr">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand bone
        titleHu="Nem biztos benne, melyikre van szüksége?" titleEn="Not sure which you need?"
        textHu="Írja le néhány mondatban a helyzetet, és segítünk összerakni a megfelelő csomagot."
        textEn="Describe your situation in a few sentences and we'll help assemble the right package."
      />
    </>
  );
}

/* ============================================================ SERVICE DETAIL (data-driven) */
export function ServiceDetail({ slug }) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  const i = SERVICES.indexOf(s);
  const prev = SERVICES[i - 1];
  const next = SERVICES[i + 1];
  return (
    <>
      <PageHero
        crumbs={<Crumb mid={<><a href="#/szolgaltatasok"><T hu="Szolgáltatások" en="Services" /></a> <span className="sep">/</span> </>} tailHu={s.nameHu} tailEn={s.nameEn} />}
        eyebrowBrass eyebrowHu={s.idx + " · Szolgáltatás"} eyebrowEn={s.idx + " · Service"}
        titleHu={s.nameHu} titleEn={s.nameEn} leadHu={s.leadHu} leadEn={s.leadEn}
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="detail-grid">
            <div className="prose rv"><p style={{ fontSize: 20, lineHeight: 1.62 }}><T hu={s.introHu} en={s.introEn} /></p></div>
            <div className="spec rv">
              <h2><span className="n">{s.idx}</span><T as="span" hu="Mit tartalmaz" en="What's included" /></h2>
              <div className="prose"><ul>{s.included.map((it, ix) => <li key={ix}><T hu={it.hu} en={it.en} /></li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec sec-bone">
        <div className="wrap">
          <div className="detail-grid">
            <div className="card-bone rv">
              <div className="k"><T hu="Kinek ajánljuk" en="Who it's for" /></div>
              <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--onyx)", fontWeight: 300 }}><T hu={s.whoHu} en={s.whoEn} /></p>
            </div>
            <div className="card-bone rv">
              <div className="k"><T hu="Hogyan dolgozunk együtt" en="How we work together" /></div>
              <div className="cadence">
                {s.cadence.map((c, ix) => (
                  <div className="row" key={ix}><span className="lab"><T hu={c.labHu} en={c.labEn} /></span><span className="val"><T hu={c.valHu} en={c.valEn} /></span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand titleHu={s.ctaHu} titleEn={s.ctaEn} textHu={QUOTE_TEXT.hu} textEn={QUOTE_TEXT.en} />
      <section className="sec sec-ivory" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="svc-nav">
            {prev
              ? <a href={"#/" + prev.slug}><span className="dir"><T hu={"← " + prev.idx + " Előző"} en={"← " + prev.idx + " Previous"} /></span><span className="nm"><T hu={prev.nameHu} en={prev.nameEn} /></span></a>
              : <span></span>}
            {next
              ? <a className="next" href={"#/" + next.slug}><span className="dir"><T hu={next.idx + " Következő →"} en={next.idx + " Next →"} /></span><span className="nm"><T hu={next.nameHu} en={next.nameEn} /></span></a>
              : <span></span>}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================ REFERENCES */
export function References() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Referenciák" tailEn="References" />}
        eyebrowBrass eyebrowHu="Referenciák" eyebrowEn="References"
        titleHu="Akik ránk bízzák a számaikat." titleEn="Who trusts us with their books."
        leadHu="Partnereink között tőzsdén jegyzett társaságok, vagyonkezelők és egy nagybank leányvállalata is megtalálható. Az elv egyszerű: rendszeres és teljes körű tájékoztatással segítjük a fejlődésüket."
        leadEn="Our clients include publicly listed companies, real-estate asset managers and a major bank's subsidiary. The principle is simple: we support their growth with regular, full reporting."
      />
      <section className="register ink-depth">
        <div className="wrap">
          <Legend style={{ marginBottom: 8 }} />
          {REGISTER_GROUPS.map((g, gi) => (
            <React.Fragment key={gi}>
              <div className={"sector-label" + (g.fam ? " " + g.fam : "")}><T hu={g.labelHu} en={g.labelEn} /></div>
              <div className="ledger stagger">
                {g.entries.map((e) => (
                  <div key={e.id} className={"entry" + (e.listed ? " listed" : "") + (g.fam ? " " + g.fam : "")}>
                    <span className="ix">{e.id}</span>
                    <span className="name">{e.listed && <span className="marker" aria-label="Tőzsdén jegyzett"></span>}{e.name}</span>
                    <span className="sector"><T hu={e.tagHu} en={e.tagEn} /></span>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
          <p className="reg-foot rv"><T hu="001–008 · a jegyzék folyamatosan bővül · a feltüntetés a partnerek hozzájárulásával történik" en="001–008 · the register grows over time · listed with each client's consent" /></p>
        </div>
      </section>
      <CtaBand
        titleHu="Csatlakozna a jegyzékhez?" titleEn="Want to join the register?"
        textHu="Mondja el néhány mondatban, mivel foglalkoznak, és egy munkanapon belül összeállítjuk az ajánlatunkat."
        textEn="Tell us in a few sentences what you do, and we'll put together a quote within one business day."
      />
    </>
  );
}

/* ============================================================ CONTACT */
export function Contact() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Kapcsolat" tailEn="Contact" />}
        eyebrowBrass eyebrowHu="Kapcsolat" eyebrowEn="Contact"
        titleHu="Beszéljük át, mire van szüksége a cégének." titleEn="Let's talk about what your company needs."
        leadHu="Mondja el néhány mondatban, mivel foglalkoznak, és egy munkanapon belül összeállítjuk az ajánlatunkat."
        leadEn="Tell us in a few sentences what you do, and we'll put together a quote within one business day."
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="contact-grid">
            <div className="rv">
              <span className="eyebrow"><T hu="Elérhetőség" en="Get in touch" /></span>
              <h2><T hu="Írjon nekünk, vagy hívjon." en="Write to us, or call." /></h2>
              <p className="copy"><T hu="Bármelyik csatornán elérhetők vagyunk. Ha űrlapot küld, igyekszünk egy munkanapon belül válaszolni." en="We're reachable on any channel. If you send the form, we aim to reply within one business day." /></p>
              <div className="contact-meta">
                <div className="row"><span className="k"><T hu="Telefon" en="Phone" /></span><span className="v">+36 30 194 2034</span></div>
                <div className="row"><span className="k"><T hu="E-mail" en="Email" /></span><span className="v">info@katzrt.hu</span></div>
                <div className="row"><span className="k"><T hu="Cím" en="Address" /></span><span className="v">1048 Budapest, Megyeri út 212.</span></div>
                <div className="row"><span className="k"><T hu="Nyitva" en="Hours" /></span><span className="v"><T hu="Hétköznap 9:00–17:00" en="Weekdays 9:00–17:00" /></span></div>
              </div>
              <div className="map-ph" role="img" aria-label="Térkép helye — 1048 Budapest, Megyeri út 212.">
                <span className="tag"><T hu="Térkép · 1048 Budapest, Megyeri út 212." en="Map · 1048 Budapest, Megyeri út 212." /></span>
                <a className="btn btn-ghost-dark" href="https://www.google.com/maps/search/?api=1&query=1048+Budapest+Megyeri+%C3%BAt+212" target="_blank" rel="noopener"><T hu="Útvonalterv" en="Directions" /> <span className="arr">→</span></a>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================ IMPRINT */
function ToBeProvided() {
  return <em style={{ color: "var(--stone)" }}><T hu="megadás alatt" en="to be provided" /></em>;
}
export function Imprint() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Impresszum" tailEn="Imprint" />}
        eyebrowBrass eyebrowHu="Jogi információ" eyebrowEn="Legal information"
        titleHu="Impresszum" titleEn="Imprint"
        leadHu="A KAT Zrt. nyilvános cégadatai és elérhetőségei." leadEn="KAT Zrt.'s public company details and contacts."
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="prose rv" style={{ maxWidth: 760 }}>
            <div className="kv">
              <div className="row"><span className="k"><T hu="Cégnév" en="Company name" /></span><span className="v">KAT Könyvszakértő, Adószakértő, Tanácsadó Zrt.</span></div>
              <div className="row"><span className="k"><T hu="Rövid név" en="Short name" /></span><span className="v">KAT Zrt.</span></div>
              <div className="row"><span className="k"><T hu="Székhely" en="Registered seat" /></span><span className="v">1048 Budapest, Megyeri út 212.</span></div>
              <div className="row"><span className="k"><T hu="Cégjegyzékszám" en="Company reg. no." /></span><span className="v"><ToBeProvided /></span></div>
              <div className="row"><span className="k"><T hu="Adószám" en="Tax no." /></span><span className="v"><ToBeProvided /></span></div>
              <div className="row"><span className="k"><T hu="Képviselő" en="Representative" /></span><span className="v"><ToBeProvided /></span></div>
              <div className="row"><span className="k"><T hu="Telefon" en="Phone" /></span><span className="v">+36 30 194 2034</span></div>
              <div className="row"><span className="k"><T hu="E-mail" en="Email" /></span><span className="v">info@katzrt.hu</span></div>
              <div className="row"><span className="k"><T hu="Tárhelyszolgáltató" en="Hosting provider" /></span><span className="v"><ToBeProvided /></span></div>
            </div>
            <p style={{ marginTop: 34, color: "var(--stone)", fontSize: 15 }}>
              <T html
                hu={`A weboldal teljes tartalma a KAT Zrt. szellemi tulajdonát képezi. A <em style="color:var(--stone);">megadás alatt</em> jelölésű mezőket a cég hivatalos adataival kell kitölteni az éles indulás előtt.`}
                en={`All content on this website is the intellectual property of KAT Zrt. The fields marked <em style="color:var(--stone);">to be provided</em> must be filled with the company's official data before go-live.`}
              />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================ PRIVACY */
export function Privacy() {
  return (
    <>
      <PageHero
        crumbs={<Crumb tailHu="Adatvédelmi tájékoztató" tailEn="Privacy notice" />}
        eyebrowBrass eyebrowHu="Jogi információ" eyebrowEn="Legal information"
        titleHu="Adatvédelmi tájékoztató" titleEn="Privacy notice"
        leadHu="Hogyan kezeljük a weboldalon keresztül megadott személyes adatokat." leadEn="How we handle the personal data you provide through this website."
      />
      <section className="sec sec-ivory">
        <div className="wrap">
          <div className="prose rv">
            <div className="draft-note"><T hu="⚠ Tervezet — a végleges, jogilag jóváhagyott szöveggel és a hiányzó cégadatokkal kell kiegészíteni az éles indulás előtt." en="⚠ Draft — to be completed with the final, legally approved text and the missing company data before go-live." /></div>

            <h2><T hu="1. Az adatkezelő" en="1. The data controller" /></h2>
            <T as="div" html
              hu={`<p>Az adatkezelő a <strong>KAT Könyvszakértő, Adószakértő, Tanácsadó Zrt.</strong> (székhely: 1048 Budapest, Megyeri út 212.). Elérhetőség adatvédelmi kérdésekben: <a href='mailto:info@katzrt.hu'>info@katzrt.hu</a>, +36 30 194 2034.</p>`}
              en={`<p>The data controller is <strong>KAT Könyvszakértő, Adószakértő, Tanácsadó Zrt.</strong> (registered seat: 1048 Budapest, Megyeri út 212.). For data-protection matters: <a href='mailto:info@katzrt.hu'>info@katzrt.hu</a>, +36 30 194 2034.</p>`}
            />

            <h2><T hu="2. Milyen adatokat kezelünk" en="2. What data we process" /></h2>
            <T as="div" html
              hu={`<p>A weboldal kapcsolatfelvételi űrlapján keresztül a következő adatokat kérjük be:</p><ul><li>név</li><li>cég neve</li><li>e-mail-cím</li><li>telefonszám (nem kötelező)</li><li>az üzenet szövege</li></ul><p>A weboldal a működéséhez feltétlenül szükséges adatokon túl nem helyez el marketing- vagy nyomkövető sütiket.</p>`}
              en={`<p>Through the website's contact form we collect the following data:</p><ul><li>name</li><li>company name</li><li>email address</li><li>phone number (optional)</li><li>the text of your message</li></ul><p>Beyond what is strictly necessary to operate, the website sets no marketing or tracking cookies.</p>`}
            />

            <h2><T hu="3. Az adatkezelés célja és jogalapja" en="3. Purpose and legal basis" /></h2>
            <T as="div" html
              hu={`<p>A megadott adatokat kizárólag az Ön megkeresésének megválaszolása és az ajánlatadás céljából kezeljük. Az adatkezelés jogalapja az Ön <strong>hozzájárulása</strong> (GDPR 6. cikk (1) a) pont), illetve a szerződéskötést megelőző lépések megtétele (GDPR 6. cikk (1) b) pont).</p>`}
              en={`<p>We process the data you provide solely to respond to your enquiry and to prepare a quote. The legal basis is your <strong>consent</strong> (GDPR Art. 6(1)(a)) and steps taken prior to entering a contract (GDPR Art. 6(1)(b)).</p>`}
            />

            <h2><T hu="4. Megőrzési idő" en="4. Retention period" /></h2>
            <T as="div" html
              hu={`<p>Az adatait a megkeresés lezárásáig, illetve a hozzájárulás visszavonásáig kezeljük. Amennyiben az együttműködés szerződéskötéshez vezet, az adatkezelésre a vonatkozó számviteli és adójogi jogszabályok megőrzési kötelezettségei az irányadók.</p>`}
              en={`<p>We keep your data until your enquiry is closed or you withdraw consent. If the contact leads to a contract, the retention obligations of the applicable accounting and tax legislation apply.</p>`}
            />

            <h2><T hu="5. Adatfeldolgozók, továbbítás" en="5. Processors and transfers" /></h2>
            <T as="div" html
              hu={`<p>Az adatokat bizalmasan kezeljük, és kizárólag a szolgáltatás nyújtásához igénybe vett adatfeldolgozók (tárhely- és e-mail-szolgáltató) férhetnek hozzá a feladatuk ellátásához szükséges mértékben. Az adatokat harmadik félnek marketing célból nem adjuk át.</p>`}
              en={`<p>We treat the data confidentially, and only the processors used to provide the service (hosting and email providers) may access it, to the extent needed for their task. We do not share the data with third parties for marketing purposes.</p>`}
            />

            <h2><T hu="6. Az Ön jogai" en="6. Your rights" /></h2>
            <T as="div" html
              hu={`<p>Az irányadó jogszabályok szerint Ön jogosult:</p><ul><li>tájékoztatást kérni és hozzáférni az adataihoz,</li><li>az adatok helyesbítését kérni,</li><li>az adatok törlését vagy kezelésük korlátozását kérni,</li><li>tiltakozni az adatkezelés ellen,</li><li>élni az adathordozhatóság jogával,</li><li>a hozzájárulását bármikor visszavonni.</li></ul>`}
              en={`<p>Under the applicable law you have the right to:</p><ul><li>request information about and access to your data,</li><li>request rectification of your data,</li><li>request erasure or restriction of processing,</li><li>object to the processing,</li><li>exercise the right to data portability,</li><li>withdraw your consent at any time.</li></ul>`}
            />

            <h2><T hu="7. Jogorvoslat" en="7. Remedies" /></h2>
            <T as="div" html
              hu={`<p>Panaszával a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest, Falk Miksa utca 9–11.) fordulhat, illetve bírósági jogorvoslattal élhet.</p>`}
              en={`<p>You may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH, 1055 Budapest, Falk Miksa utca 9–11.), or seek a judicial remedy.</p>`}
            />

            <h2><T hu="8. Kapcsolat" en="8. Contact" /></h2>
            <T as="div" html
              hu={`<p>Adatvédelmi kérdésével írjon a <a href='mailto:info@katzrt.hu'>info@katzrt.hu</a> címre.</p>`}
              en={`<p>For data-protection questions, write to <a href='mailto:info@katzrt.hu'>info@katzrt.hu</a>.</p>`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
