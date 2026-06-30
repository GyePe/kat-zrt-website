import React from "react";
import * as ReactDOM from "react-dom/client";
import "./kat.css";
import "./pages.css";
import { LangProvider, Header, Footer, useReveal, useTilt, useLang } from "./ui.jsx";
import { Home, About, Services, ServiceDetail, References, Contact, Imprint, Privacy } from "./pages.jsx";
import { SERVICES } from "./data.js";

const { useState, useEffect } = React;

const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

// ---- hash router: "#/rolunk" -> "/rolunk" ----
function parseRoute() {
  let h = window.location.hash || "";
  if (h.startsWith("#")) h = h.slice(1);
  if (!h.startsWith("/")) h = "/";
  return h;
}

// ---- per-route document titles (HU master / EN) ----
const TITLES = {
  "/": { hu: "KAT Zrt — Megbízható pénzügyi partner cégeknek, 2000 óta", en: "Your reliable financial partner since 2000 — KAT Zrt" },
  "/rolunk": { hu: "Rólunk — KAT Zrt", en: "About — KAT Zrt" },
  "/szolgaltatasok": { hu: "Szolgáltatások — KAT Zrt", en: "Services — KAT Zrt" },
  "/referenciak": { hu: "Referenciák — KAT Zrt", en: "References — KAT Zrt" },
  "/kapcsolat": { hu: "Kapcsolat — KAT Zrt", en: "Contact — KAT Zrt" },
  "/impresszum": { hu: "Impresszum — KAT Zrt", en: "Imprint — KAT Zrt" },
  "/adatvedelem": { hu: "Adatvédelmi tájékoztató — KAT Zrt", en: "Privacy notice — KAT Zrt" },
};
SERVICES.forEach((s) => { TITLES["/" + s.slug] = { hu: s.nameHu + " — KAT Zrt", en: s.nameEn + " — KAT Zrt" }; });

function View({ route }) {
  switch (route) {
    case "/": return <Home />;
    case "/rolunk": return <About />;
    case "/szolgaltatasok": return <Services />;
    case "/referenciak": return <References />;
    case "/kapcsolat": return <Contact />;
    case "/impresszum": return <Imprint />;
    case "/adatvedelem": return <Privacy />;
    default: {
      const slug = route.slice(1);
      if (SERVICE_SLUGS.includes(slug)) return <ServiceDetail slug={slug} />;
      return <Home />;
    }
  }
}

function App() {
  const [route, setRoute] = useState(parseRoute());
  const { lang } = useLang();

  useEffect(() => {
    const onHash = () => { setRoute(parseRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const t = TITLES[route] || TITLES["/"];
    document.title = lang === "en" ? t.en : t.hu;
  }, [route, lang]);

  // re-run scroll reveals + ink-depth tilt on every route/lang change
  useReveal(route + "|" + lang);
  useTilt(route + "|" + lang);

  return (
    <>
      <Header route={route} />
      <View route={route} />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <LangProvider>
    <App />
  </LangProvider>
);
