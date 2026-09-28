// Booking link for the free first meeting ("Prenota un primo incontro gratuito").
// Paste a Google Calendar appointment page or Calendly URL here to embed it on
// contatti.html#prenota. Leave empty to keep the email fallback.
const BOOKING_URL = "";

const pages = [
  ["startup.html", "Startup"],
  ["aziende.html", "Aziende"],
  ["community.html", "Community"],
  ["blog.html", "Blog"],
];

// The six company-facing services, shown in the "Aziende" dropdown.
const aziendeSub = [
  ["consulenza-ai.html", "Consulenza AI"],
  ["open-innovation.html", "Open innovation"],
  ["onshoring.html", "Onshoring"],
  ["agency.html", "Agency"],
  ["academy.html", "Academy"],
  ["coworking.html", "Coworking e uffici"],
];

const visuals = {
  "index.html": ["assets/sardinia-collage.jpg", "Cagliari e la Sardegna"],
  "aziende.html": ["assets/poc-collage.jpg", "Persone, processo, territorio"],
  "coworking.html": ["assets/sardinia-collage.jpg", "Viale La Plaia 15"],
  "open-innovation.html": ["assets/poc-collage.jpg", "Vuoto, matching, ingresso"],
  "consulenza-ai.html": ["assets/ai-operations-map.jpg", "Dal lavoro esistente"],
  "blog.html": ["assets/startup-map.svg", "Scritti di Livio Q"],
  "academy.html": ["assets/startup-map.svg", "Mestiere in uscita"],
  "agency.html": ["assets/poc-collage.jpg", "Candidati e processo"],
  "onshoring.html": ["assets/sardinia-collage.jpg", "Sede, visto, casa, fondi"],
  "community.html": ["assets/coworking-facade.jpg", "Viale La Plaia 15, Cagliari"],
  "chi-siamo.html": ["assets/sardinia-collage.jpg", "Dal 2009 a Cagliari"],
  "contatti.html": ["assets/sardinia-collage.jpg", "Viale La Plaia 15"],
};

function currentFile() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function photoKey(src) {
  return (src || "")
    .split("/")
    .pop()
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .replace(/_/g, "-");
}

function teamCandidates(src) {
  const raw = (src || "").replace(/^assets\/team\//, "").replace(/\.(jpg|jpeg|png)$/i, "");
  const under = raw.replace(/-/g, "_");
  const hyphen = raw.replace(/_/g, "-");
  return [
    src,
    `assets/team/${hyphen}.png`,
    `assets/team/${under}.png`,
    `assets/team/${hyphen}.jpg`,
    `assets/team/${hyphen}.jpeg`,
    `assets/team/${under}.jpg`,
    `assets/team/${under}.jpeg`,
  ];
}

function ensureFavicon() {
  const links = [
    ["icon", "image/x-icon", "assets/favicon/favicon.ico", null],
    ["icon", "image/png", "assets/favicon/favicon-32.png", "32x32"],
    ["icon", "image/png", "assets/favicon/favicon-16.png", "16x16"],
    ["apple-touch-icon", null, "assets/favicon/apple-touch-icon.png", "180x180"],
  ];
  links.forEach(([rel, type, href, sizes]) => {
    if ([...document.querySelectorAll(`link[rel='${rel}']`)].some((n) => n.getAttribute("href") === href)) return;
    const el = document.createElement("link");
    el.rel = rel;
    if (type) el.type = type;
    if (sizes) el.sizes = sizes;
    el.href = href;
    document.head.appendChild(el);
  });
}

function mountVisual() {
  const spec = visuals[currentFile()];
  if (!spec) return;
  const [src, cap] = spec;
  const existing = document.querySelector(".visual-frame img");
  if (existing) {
    const capEl = existing.parentElement.querySelector("figcaption");
    // Same image as authored: keep the page's own alt text and caption.
    if (existing.getAttribute("src") === src) {
      if (!existing.getAttribute("alt")) existing.alt = cap;
      if (capEl && !capEl.textContent.trim()) capEl.textContent = cap;
      return;
    }
    existing.src = src;
    existing.alt = cap;
    if (capEl) capEl.textContent = cap;
  }
}

function loadFirst(el, urls, alt) {
  const key = photoKey(urls[0] || el.getAttribute("data-photo") || "");
  const embedded = (window.TNV_TEAM_PHOTOS || {})[key];
  if (embedded) {
    const img = new Image();
    img.alt = alt || "";
    img.src = embedded;
    el.innerHTML = "";
    el.appendChild(img);
    return;
  }
  const tryNext = (i) => {
    if (i >= urls.length) return;
    const img = new Image();
    img.onload = () => {
      el.innerHTML = "";
      img.alt = alt || "";
      el.appendChild(img);
    };
    img.onerror = () => tryNext(i + 1);
    img.src = urls[i] + "?v=portraits3";
  };
  tryNext(0);
}

function mountPhotos() {
  document.querySelectorAll("[data-photo]").forEach((el) => {
    loadFirst(el, teamCandidates(el.getAttribute("data-photo")), el.getAttribute("data-alt"));
  });
}

function navHTML(file) {
  const cur = (h) => (h === file ? ' aria-current="page"' : "");
  return pages.map(([href, label]) => {
    if (href !== "aziende.html") return `<a href="${href}"${cur(href)}>${label}</a>`;
    const inSub = aziendeSub.some(([h]) => h === file);
    return `<div class="has-sub"><a href="${href}" class="sub-parent"${href === file || inSub ? ' aria-current="page"' : ""}>${label}</a><button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-aziende" aria-label="Servizi per le aziende"><span aria-hidden="true">▾</span></button><ul class="sub" id="sub-aziende"><li><a href="aziende.html"${cur("aziende.html")}>Tutti i servizi per le aziende</a></li>${aziendeSub.map(([h, l]) => `<li><a href="${h}"${cur(h)}>${l}</a></li>`).join("")}</ul></div>`;
  }).join("");
}

function setupDropdowns(nav) {
  const desktop = window.matchMedia("(min-width: 861px)");
  nav.querySelectorAll(".has-sub").forEach((item) => {
    const btn = item.querySelector(".sub-toggle");
    let hoverOpenedAt = 0, escClosed = false;
    const set = (open) => { item.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // a tap on touch screens fires mouseenter right before click: keep it open
      if (Date.now() - hoverOpenedAt < 400) return set(true);
      set(!item.classList.contains("open"));
    });
    item.addEventListener("mouseenter", () => { if (desktop.matches && !item.classList.contains("open")) { hoverOpenedAt = Date.now(); set(true); } });
    item.addEventListener("mouseleave", () => { if (desktop.matches) set(false); });
    item.addEventListener("focusin", () => { if (desktop.matches && !escClosed) set(true); });
    item.addEventListener("focusout", (e) => { if (!item.contains(e.relatedTarget)) { escClosed = false; if (desktop.matches) set(false); } });
    item.addEventListener("keydown", (e) => { if (e.key === "Escape" && item.classList.contains("open")) { e.stopPropagation(); escClosed = true; set(false); item.querySelector(".sub-parent").focus(); } });
    document.addEventListener("click", (e) => { if (!item.contains(e.target)) set(false); });
  });
}

function mountBooking() {
  document.querySelectorAll("[data-booking]").forEach((box) => {
    if (!BOOKING_URL) return; // email fallback stays visible
    const fallback = box.querySelector("[data-booking-fallback]");
    const frame = document.createElement("iframe");
    frame.src = BOOKING_URL;
    frame.title = "Calendario per prenotare un primo incontro gratuito";
    frame.loading = "lazy";
    frame.className = "booking-frame";
    const link = document.createElement("p");
    link.className = "note";
    link.innerHTML = `Il calendario non si vede? <a href="${BOOKING_URL}" target="_blank" rel="noopener">Aprilo in una nuova scheda</a>.`;
    box.prepend(frame, link);
    if (fallback) fallback.classList.add("booking-alt");
  });
}

function mount() {
  ensureFavicon();
  const file = currentFile();
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `<div class="wrap header-inner"><a class="logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><button class="menu-toggle" type="button" aria-label="Apri il menu" aria-controls="primary-nav" aria-expanded="false">Menu</button><nav class="primary" id="primary-nav" aria-label="Menu principale">${navHTML(file)}<a class="btn" href="contatti.html#prenota">Primo incontro</a></nav></div>`;
    const toggle = header.querySelector(".menu-toggle"), nav = header.querySelector("nav.primary");
    const setMenu = (open) => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu"); };
    toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    setupDropdowns(nav);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); } });
  }
  if (footer) {
    footer.innerHTML = `<div class="wrap footer-grid"><div><a class="logo footer-logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><br>Viale La Plaia 15, 09123 Cagliari<br>+39 070 23 30 200</div><div><strong>Offerte</strong><a href="startup.html">Startup</a><a href="aziende.html">Aziende</a>${aziendeSub.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}</div><div><strong>Community</strong><a href="community.html">La community</a><a href="community.html#eventi">Eventi</a><a href="blog.html">Blog</a></div><div><strong>Contatti</strong><a href="contatti.html#prenota">Primo incontro gratuito</a><a href="mailto:info@thenetvalue.com">info@thenetvalue.com</a><a href="chi-siamo.html">Chi siamo</a></div></div><div class="wrap footer-legal">© ${new Date().getFullYear()} The Net Value – Tutti i diritti riservati – <a href="https://thenetvalue.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a> – <a href="https://www.iubenda.com/privacy-policy/87409195/cookie-policy" target="_blank" rel="noopener">Cookie Policy</a> – <a href="https://thenetvalue.com/condizioni-generali-tnv-academy/" target="_blank" rel="noopener">Condizioni Generali TNV Academy</a> – P. IVA/VAT 03219010927</div>`;
  }
  mountVisual();
  mountPhotos();
  mountBooking();
}
document.addEventListener("DOMContentLoaded", mount);
