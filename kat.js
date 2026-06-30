/* ============================================================
   KAT Zrt — shared behaviour
   Motion: keyframe-based reveals (capture-safe), reversible on scroll.
   ============================================================ */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var docEl = document.documentElement;

  /* ---------- reveal on scroll: reversible, JS-gated via html.kanim ----------
     CSS hides .rv / .stagger>* ONLY under html.kanim, so no-JS = everything shown.
     IntersectionObserver toggles .in (add on enter, remove when fully gone) so the
     entrance animation replays as you scroll back and forth. */
  function initReveals() {
    var els = [].slice.call(document.querySelectorAll(".rv, .stagger"));
    if (!els.length) return;

    function reveal(el) {
      if (!el.classList.contains("in")) el.classList.add("in");
    }
    function unreveal(el) {
      if (el.classList.contains("in")) el.classList.remove("in");
    }

    // reduced motion: never animate (CSS guard also forces transform:none)
    if (reduce) { els.forEach(reveal); return; }

    function vh() { return window.innerHeight || docEl.clientHeight; }
    function revealPassed() {
      // safety: reveal anything at or above the viewport so nothing visible is stuck
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh() * 0.92) reveal(el);
      });
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) reveal(e.target);
          else unreveal(e.target);
        });
      }, { threshold: [0, 0.12], rootMargin: "0px 0px -7% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      // no IO: reveal what's in view on scroll (one-way)
      window.addEventListener("scroll", revealPassed, { passive: true });
    }

    // above-the-fold content reveals immediately on load
    revealPassed();
    window.addEventListener("load", revealPassed);
    setTimeout(revealPassed, 350);
    // hard safety net: never leave visible/passed content hidden
    setTimeout(revealPassed, 2600);
  }

  /* ---------- 3D floor: subtle pointer tilt on .ink-depth sections ---------- */
  function initTilt() {
    if (reduce) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;
    [].slice.call(document.querySelectorAll(".ink-depth")).forEach(function (sec) {
      sec.addEventListener("pointermove", function (e) {
        var r = sec.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        sec.style.setProperty("--fx", (nx * 2.4).toFixed(2) + "deg");
        sec.style.setProperty("--fy", (ny * -2.0).toFixed(2) + "deg");
      });
      sec.addEventListener("pointerleave", function () {
        sec.style.setProperty("--fx", "0deg");
        sec.style.setProperty("--fy", "0deg");
      });
    });
  }

  /* ---------- mobile menu ---------- */
  function initMenu() {
    var btn = document.querySelector(".menu-toggle");
    var links = document.querySelector(".navlinks");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      links.style.display = getComputedStyle(links).display === "none" ? "flex" : "none";
    });
  }

  /* ---------- year stamp ---------- */
  function initYear() {
    var y = document.getElementById("yr");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- enquiry form ---------- */
  function initForm() {
    var form = document.querySelector("form.enquiry");
    if (!form) return;
    var emailOK = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); };

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var nev = form.querySelector("#f-nev");
      var ceg = form.querySelector("#f-ceg");
      var email = form.querySelector("#f-email");
      var uzenet = form.querySelector("#f-uzenet");
      var consent = form.querySelector("#f-consent");
      var consentWrap = form.querySelector(".consent");
      var ok = true, firstBad = null;
      function check(input, valid) {
        var f = input.closest(".field");
        if (f) f.classList.toggle("invalid", !valid);
        if (!valid) { ok = false; firstBad = firstBad || input; }
      }
      check(nev, nev.value.trim().length > 1);
      check(ceg, ceg.value.trim().length > 1);
      check(email, emailOK(email.value));
      check(uzenet, uzenet.value.trim().length > 4);
      var consentOK = consent.checked;
      consentWrap.classList.toggle("invalid", !consentOK);
      if (!consentOK) { ok = false; firstBad = firstBad || consent; }
      if (!ok) { if (firstBad) firstBad.focus(); return; }
      form.classList.add("sent");
    });

    form.querySelectorAll("input, textarea").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var f = inp.closest(".field"); if (f) f.classList.remove("invalid");
      });
    });
    var consentBox = form.querySelector("#f-consent");
    if (consentBox) consentBox.addEventListener("change", function () {
      form.querySelector(".consent").classList.remove("invalid");
    });
  }

  /* ---------- language toggle (HU master / EN adaptation) ---------- */
  var LANG_KEY = "kat-lang";
  function currentLang() {
    try { return localStorage.getItem(LANG_KEY) === "en" ? "en" : "hu"; } catch (e) { return "hu"; }
  }
  function applyLang(lang) {
    var isEn = lang === "en";
    docEl.lang = isEn ? "en" : "hu";
    if (document.body.getAttribute("data-hu-title") == null) document.body.setAttribute("data-hu-title", document.title);
    var enTitle = document.body.getAttribute("data-en-title");
    document.title = (isEn && enTitle) ? enTitle : document.body.getAttribute("data-hu-title");
    [].slice.call(document.querySelectorAll("[data-en]")).forEach(function (el) {
      if (el.getAttribute("data-hu") == null) el.setAttribute("data-hu", el.innerHTML);
      el.innerHTML = isEn ? el.getAttribute("data-en") : el.getAttribute("data-hu");
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    var tg = document.querySelector(".lang-toggle");
    if (tg) [].slice.call(tg.querySelectorAll("[data-lang]")).forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }
  function injectToggle() {
    var navEl = document.querySelector(".nav");
    if (!navEl || navEl.querySelector(".lang-toggle")) return;
    var cta = navEl.querySelector(".btn-primary");
    var tg = document.createElement("div");
    tg.className = "lang-toggle";
    tg.setAttribute("role", "group");
    tg.setAttribute("aria-label", "Nyelv / Language");
    tg.innerHTML =
      '<button type="button" data-lang="hu" aria-pressed="true">HU</button>' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>';
    tg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lang]");
      if (b) applyLang(b.getAttribute("data-lang"));
    });
    if (cta) navEl.insertBefore(tg, cta); else navEl.appendChild(tg);
  }

  /* ---------- render a register / ledger from data ---------- */
  window.KAT = window.KAT || {};
  window.KAT.applyLang = applyLang;
  window.KAT.renderLedger = function (mountSelector, items) {
    var mount = document.querySelector(mountSelector);
    if (!mount) return;
    mount.innerHTML = items.map(function (r) {
      return '<div class="entry' + (r.listed ? " listed" : "") + '">' +
        '<span class="ix">' + r.id + '</span>' +
        '<span class="name">' + (r.listed ? '<span class="marker" aria-label="Tőzsdén jegyzett"></span>' : "") + r.name + '</span>' +
        '<span class="sector">' + r.sector + '</span>' +
        '</div>';
    }).join("");
  };

  document.addEventListener("DOMContentLoaded", function () {
    injectToggle();
    applyLang(currentLang());
    initReveals();
    initTilt();
    initMenu();
    initYear();
    initForm();
  });
})();
