/* ============================================================
   KAT Zrt — bilingual content data (HU master / EN adaptation).
   Transcribed faithfully from the design handoff. Edit copy here.
   ============================================================ */

// ---- The Register: client roster (home, flat 001–008) ----
// fam: "" listed/coral · "fin" finance/aqua · "re" real-estate/almond
export const REFERENCES = [
  { id: "001", name: "4 Stripe Zrt.",                  sectorHu: "PÉNZÜGY",                  sectorEn: "FINANCE",                  listed: false, fam: "fin" },
  { id: "002", name: "Air-Invest Vagyonkezelő Kft.",   sectorHu: "INGATLAN · VAGYONKEZELÉS", sectorEn: "REAL ESTATE · ASSET MGMT", listed: false, fam: "re" },
  { id: "003", name: "AKKO Invest Nyrt.",              sectorHu: "TŐZSDEI / NYRT.",          sectorEn: "LISTED / NYRT.",           listed: true,  fam: "" },
  { id: "004", name: "Amixa Nyrt.",                    sectorHu: "TŐZSDEI / NYRT.",          sectorEn: "LISTED / NYRT.",           listed: true,  fam: "" },
  { id: "005", name: "Appeninn Nyrt.",                 sectorHu: "TŐZSDEI / NYRT.",          sectorEn: "LISTED / NYRT.",           listed: true,  fam: "" },
  { id: "006", name: "eSense Nyrt.",                   sectorHu: "TŐZSDEI / NYRT.",          sectorEn: "LISTED / NYRT.",           listed: true,  fam: "" },
  { id: "007", name: "OTP Kártyagyártó Kft.",          sectorHu: "PÉNZÜGY · OTP CSOPORT",    sectorEn: "FINANCE · OTP GROUP",      listed: false, fam: "fin" },
  { id: "008", name: "Bank Center No. 1 üzemeltetője", sectorHu: "INGATLAN · VAGYONKEZELÉS", sectorEn: "REAL ESTATE · ASSET MGMT", listed: false, fam: "re" },
];

// ---- References page: grouped by sector (own per-entry tags) ----
export const REGISTER_GROUPS = [
  {
    fam: "", labelHu: "Tőzsdén jegyzett társaságok", labelEn: "Publicly listed companies",
    entries: [
      { id: "001", name: "AKKO Invest Nyrt.", listed: true, tagHu: "NYRT.", tagEn: "NYRT. · LISTED" },
      { id: "002", name: "Amixa Nyrt.",       listed: true, tagHu: "NYRT.", tagEn: "NYRT. · LISTED" },
      { id: "003", name: "Appeninn Nyrt.",    listed: true, tagHu: "NYRT.", tagEn: "NYRT. · LISTED" },
      { id: "004", name: "eSense Nyrt.",      listed: true, tagHu: "NYRT.", tagEn: "NYRT. · LISTED" },
    ],
  },
  {
    fam: "fin", labelHu: "Pénzügy", labelEn: "Finance",
    entries: [
      { id: "005", name: "4 Stripe Zrt.",          listed: false, tagHu: "ZRT.",            tagEn: "ZRT." },
      { id: "006", name: "OTP Kártyagyártó Kft.",  listed: false, tagHu: "KFT. · OTP CSOPORT", tagEn: "KFT. · OTP GROUP" },
    ],
  },
  {
    fam: "re", labelHu: "Ingatlan · vagyonkezelés", labelEn: "Real estate · asset management",
    entries: [
      { id: "007", name: "Air-Invest Vagyonkezelő Kft.",   listed: false, tagHu: "KFT.",         tagEn: "KFT." },
      { id: "008", name: "Bank Center No. 1 üzemeltetője", listed: false, tagHu: "ÜZEMELTETÉS",  tagEn: "OPERATIONS" },
    ],
  },
];

// ---- Services (01–04): home cards, services index rows, + detail pages ----
export const SERVICES = [
  {
    slug: "konyveles", idx: "01",
    nameHu: "Könyvelés", nameEn: "Accounting",
    shortHu: "Pontos, határidőre kész könyvelés, a cége működésére szabva.",
    shortEn: "Accurate, on-time bookkeeping, tailored to how your company runs.",
    rowHu: "Pontos, határidőre kész könyvelés, a cége működésére szabva — a folyamatos vezetéstől a beszámolóig.",
    rowEn: "Accurate, on-time bookkeeping tailored to how your company runs — from day-to-day records to the annual report.",
    leadHu: "Pontos, határidőre kész könyvelés, a cége működésére szabva — a folyamatos könyvvezetéstől az éves beszámolóig.",
    leadEn: "Accurate, on-time bookkeeping tailored to how your company runs — from continuous records to the annual report.",
    introHu: "A könyvelés nálunk nem fekete doboz, amibe bekerülnek a bizonylatok, és kijön a beszámoló. Folyamatosan vezetjük a könyveit, időben jelezzük, ha valami figyelmet kíván, és minden zárásnál érthetően elmondjuk, mit mutatnak a számok. A munka úgy van felépítve, hogy bármikor auditálható és átlátható legyen — ezt a könyvvizsgált és tőzsdén jegyzett ügyfeleink is elvárják.",
    introEn: "Accounting here isn't a black box that swallows receipts and spits out a report. We keep your books continuously, flag anything that needs attention in good time, and at every close we explain, clearly, what the numbers show. The work is built to stay auditable and transparent at any moment — which our audited and listed clients expect.",
    included: [
      { hu: "Folyamatos könyvvezetés — főkönyv és analitikus nyilvántartások", en: "Continuous bookkeeping — general ledger and sub-ledgers" },
      { hu: "Áfa-bevallások és összesítő nyilatkozatok", en: "VAT returns and recapitulative statements" },
      { hu: "Havi és negyedéves zárások, egyeztetésekkel", en: "Monthly and quarterly closes, with reconciliations" },
      { hu: "Éves beszámoló összeállítása és letétbe helyezése", en: "Annual report preparation and filing" },
      { hu: "Folyószámla- és tételszintű egyeztetés", en: "Account- and item-level reconciliation" },
      { hu: "Kapcsolattartás a NAV-val és a könyvvizsgálóval", en: "Liaison with the tax authority (NAV) and the auditor" },
    ],
    whoHu: "Kft.-k, Zrt.-k és Nyrt.-k, amelyek megbízható, auditálható könyvelést várnak — a növekvő kkv-któl a tőzsdén jegyzett társaságokig és vagyonkezelőkig.",
    whoEn: "Kft.s, Zrt.s and Nyrt.s that expect reliable, auditable accounting — from growing SMEs to listed companies and asset managers. (Kft. = limited liability company, Zrt. = private limited by shares, Nyrt. = publicly listed plc.)",
    cadence: [
      { labHu: "Gyakoriság", labEn: "Frequency", valHu: "Folyamatos vezetés, havi feldolgozás", valEn: "Continuous records, monthly processing" },
      { labHu: "Beszámoló", labEn: "Report", valHu: "Évente, határidőre, letétbe helyezve", valEn: "Annually, on time, filed" },
      { labHu: "Riport", labEn: "Reporting", valHu: "Igény szerint, érthető magyarázattal", valEn: "On demand, with a clear explanation" },
      { labHu: "Kapcsolat", labEn: "Contact", valHu: "Dedikált könyvelő", valEn: "A dedicated accountant" },
    ],
    ctaHu: "Kérjen ajánlatot a könyvelés szolgáltatásunkra.",
    ctaEn: "Request a quote for our accounting service.",
  },
  {
    slug: "berszamfejtes", idx: "02",
    nameHu: "Bérszámfejtés", nameEn: "Payroll",
    shortHu: "Bérek, kifizetések és járulékok kézben tartva, hibátlanul.",
    shortEn: "Wages, payments and contributions handled flawlessly.",
    rowHu: "Bérek, kifizetések és járulékok kézben tartva, hibátlanul — a havi futtatástól a hatósági bevallásokig.",
    rowEn: "Wages, payments and contributions handled flawlessly — from the monthly run to statutory filings.",
    leadHu: "Bérek, kifizetések és járulékok kézben tartva, hibátlanul — a havi futtatástól a hatósági bejelentésekig.",
    leadEn: "Wages, payments and contributions handled flawlessly — from the monthly run to statutory filings.",
    introHu: "A bérszámfejtésben a pontosság és a határidő nem opció. Átvállaljuk a teljes folyamatot a havi futtatástól a bevallásokig, kezeljük a be- és kilépőket, a távolléteket és a béren kívüli juttatásokat — Ön pedig időben, hibátlanul kapja meg azt, amire a működéshez és a döntésekhez szüksége van. A munkavállalói adatokat szigorú bizalmassággal kezeljük.",
    introEn: "In payroll, accuracy and deadlines aren't optional. We take on the whole process from the monthly run to the filings, handle joiners and leavers, absences and fringe benefits — so you receive what you need for operations and decisions on time and without errors. Employee data is treated in strict confidence.",
    included: [
      { hu: "Havi bérszámfejtés és bérjegyzék készítése", en: "Monthly payroll and payslip preparation" },
      { hu: "Járulékok és adók megállapítása, bevallása", en: "Calculation and filing of contributions and taxes" },
      { hu: "Be- és kilépők kezelése, jogviszony-bejelentés", en: "Joiner/leaver administration and employment registration" },
      { hu: "Szabadság-, táppénz- és távollét-nyilvántartás", en: "Leave, sick-pay and absence records" },
      { hu: "Cafeteria és béren kívüli juttatások kezelése", en: "Cafeteria and fringe-benefit administration" },
      { hu: "Bérügyi adatszolgáltatás a vezetésnek", en: "Payroll reporting to management" },
    ],
    whoHu: "Cégek, ahol a bérszámfejtés pontossága és a határidők tartása alapelvárás — néhány főtől a több száz fős állományig.",
    whoEn: "Companies where payroll accuracy and meeting deadlines are a baseline expectation — from a handful of staff to several hundred.",
    cadence: [
      { labHu: "Gyakoriság", labEn: "Frequency", valHu: "Havi futtatás, fix ütemben", valEn: "Monthly run, on a fixed schedule" },
      { labHu: "Bejelentések", labEn: "Filings", valHu: "Határidőre, hibátlanul a NAV felé", valEn: "On time and error-free to NAV" },
      { labHu: "Bizalmasság", labEn: "Confidentiality", valHu: "Szigorú adat- és bérkezelés", valEn: "Strict data and payroll handling" },
      { labHu: "Kapcsolat", labEn: "Contact", valHu: "Dedikált bérszámfejtő", valEn: "A dedicated payroll specialist" },
    ],
    ctaHu: "Kérjen ajánlatot a bérszámfejtés szolgáltatásunkra.",
    ctaEn: "Request a quote for our payroll service.",
  },
  {
    slug: "tanacsadas", idx: "03",
    nameHu: "Tanácsadás", nameEn: "Advisory",
    shortHu: "Tiszta pénzügyi rálátás a fontos üzleti döntésekhez.",
    shortEn: "Clear financial visibility for the decisions that matter.",
    rowHu: "Tiszta pénzügyi rálátás a fontos üzleti döntésekhez — riportok és értelmezés, nem csak adatok.",
    rowEn: "Clear financial visibility for the decisions that matter — reports and interpretation, not just data.",
    leadHu: "Tiszta pénzügyi rálátás a fontos üzleti döntésekhez — riportok és értelmezés, nem csak nyers adatok.",
    leadEn: "Clear financial visibility for the decisions that matter — reports and interpretation, not raw data.",
    introHu: "A beszámoló a múltról szól; a döntésekhez azonban a jelen és a jövő képe kell. Vezetői riportokat készítünk, amelyek érthetően mutatják meg a cég pénzügyi helyzetét, és rendszeresen átbeszéljük Önnel, mit jelentenek a számok. Így a fontos lépéseknél — beruházás, bővítés, árazás — nem sötétben tapogatózik, hanem tiszta rálátással dönt.",
    introEn: "The annual report is about the past; decisions need a picture of the present and the future. We produce management reports that show your company's financial position clearly, and we go through with you, regularly, what the numbers mean. So at the big moments — investment, expansion, pricing — you decide with clear visibility, not in the dark.",
    included: [
      { hu: "Vezetői riportok és pénzügyi kimutatások", en: "Management reports and financial statements" },
      { hu: "Eredmény- és likviditástervezés", en: "P&L and liquidity planning" },
      { hu: "Költséghely- és projektszintű elemzés", en: "Cost-centre and project-level analysis" },
      { hu: "Mutatószámok és trendek értelmezése", en: "Interpretation of KPIs and trends" },
      { hu: "Döntés-előkészítő számítások, forgatókönyvek", en: "Decision-support calculations and scenarios" },
      { hu: "Rendszeres, személyes egyeztetés a vezetéssel", en: "Regular, in-person reviews with management" },
    ],
    whoHu: "Tulajdonosok és vezetők, akiknek a számok mögötti történet is kell — nem csak a kötelező beszámoló.",
    whoEn: "Owners and managers who want the story behind the numbers — not just the statutory report.",
    cadence: [
      { labHu: "Gyakoriság", labEn: "Frequency", valHu: "Havi vagy negyedéves, igény szerint", valEn: "Monthly or quarterly, as needed" },
      { labHu: "Forma", labEn: "Format", valHu: "Érthető riport és szóbeli egyeztetés", valEn: "A clear report plus a verbal review" },
      { labHu: "Fókusz", labEn: "Focus", valHu: "Döntéstámogatás, nem adathalmaz", valEn: "Decision support, not a data dump" },
      { labHu: "Kapcsolat", labEn: "Contact", valHu: "Közvetlen szakértői egyeztetés", valEn: "Direct access to an expert" },
    ],
    ctaHu: "Kérjen ajánlatot a tanácsadás szolgáltatásunkra.",
    ctaEn: "Request a quote for our advisory service.",
  },
  {
    slug: "adotanacsadas", idx: "04",
    nameHu: "Adótanácsadás", nameEn: "Tax advisory",
    shortHu: "Kiszámítható válaszok adózási és jogi kérdésekben.",
    shortEn: "Predictable answers on tax and legal questions.",
    rowHu: "Kiszámítható válaszok adózási és jogi kérdésekben — tervezés, optimalizálás és képviselet.",
    rowEn: "Predictable answers on tax and legal questions — planning, optimisation and representation.",
    leadHu: "Kiszámítható válaszok adózási és jogi kérdésekben — tervezés, optimalizálás és képviselet egy helyen.",
    leadEn: "Predictable answers on tax and legal questions — planning, optimisation and representation in one place.",
    introHu: "Az adózás akkor jó, ha kiszámítható. Segítünk a szabályok keretein belül megtervezni és optimalizálni a cég adóterheit, gyorsan adunk állásfoglalást a felmerülő kérdésekre, és szükség esetén képviseljük Önt a hatóság előtt. A jogszabályváltozásokat folyamatosan figyeljük, és időben szólunk, ha valami a cégét érinti — a cél a megelőzés, nem a tűzoltás.",
    introEn: "Tax works best when it's predictable. We help plan and optimise your company's tax burden within the rules, give fast opinions on the questions that arise, and represent you before the authority when needed. We track legislative changes continuously and flag in good time anything that affects you — the goal is prevention, not firefighting.",
    included: [
      { hu: "Adótervezés és -optimalizálás a szabályok keretein belül", en: "Tax planning and optimisation within the rules" },
      { hu: "Társasági adó, áfa és helyi adók kezelése", en: "Corporate tax, VAT and local taxes" },
      { hu: "Állásfoglalások és adózási vélemények", en: "Rulings and tax opinions" },
      { hu: "Képviselet adóhatósági eljárásokban", en: "Representation in tax authority proceedings" },
      { hu: "Szerződések és tranzakciók adózási átvilágítása", en: "Tax due diligence of contracts and transactions" },
      { hu: "Jogszabályváltozások figyelése és proaktív tájékoztatás", en: "Monitoring of legislative changes and proactive updates" },
    ],
    whoHu: "Cégek, amelyek kiszámíthatóságot és felkészültséget várnak az adózásban — különösen összetettebb, nemzetközi vagy szabályozott működés mellett.",
    whoEn: "Companies that expect predictability and preparedness in tax — especially with more complex, international or regulated operations.",
    cadence: [
      { labHu: "Gyakoriság", labEn: "Frequency", valHu: "Folyamatos, plusz igény szerinti kérdések", valEn: "Ongoing, plus questions as they arise" },
      { labHu: "Reakcióidő", labEn: "Response time", valHu: "Gyors, használható állásfoglalás", valEn: "Fast, usable opinions" },
      { labHu: "Szemlélet", labEn: "Approach", valHu: "Megelőzés, nem utólagos tűzoltás", valEn: "Prevention, not after-the-fact firefighting" },
      { labHu: "Kapcsolat", labEn: "Contact", valHu: "Dedikált adószakértő", valEn: "A dedicated tax adviser" },
    ],
    // NOTE: design had "a adótanácsadás" (grammar slip) — corrected to "az adótanácsadás".
    ctaHu: "Kérjen ajánlatot az adótanácsadás szolgáltatásunkra.",
    ctaEn: "Request a quote for our tax advisory service.",
  },
];
