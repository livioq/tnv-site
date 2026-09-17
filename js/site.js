const pages = [
  ["startup.html", "Startup"],
  ["aziende.html", "Aziende"],
  ["coworking.html", "Coworking"],
  ["open-innovation.html", "Open innovation"],
  ["consulenza-ai.html", "Consulenza AI"],
  ["eventi.html", "Eventi"],
  ["blog.html", "Blog"],
];

const visuals = {
  "index.html": ["assets/sardinia-collage.jpg", "Viale La Plaia 15, Cagliari"],
  "startup.html": ["assets/sardinia-collage.jpg", "Consulenza, capitale, rete"],
  "aziende.html": ["assets/poc-collage.jpg", "Persone, processo, territorio"],
  "coworking.html": ["assets/sardinia-collage.jpg", "Viale La Plaia 15"],
  "open-innovation.html": ["assets/poc-collage.jpg", "Vuoto, matching, ingresso"],
  "consulenza-ai.html": ["assets/ai-operations-map.jpg", "Dal lavoro esistente"],
  "eventi.html": ["assets/sardinia-collage.jpg", "Community e location"],
  "blog.html": ["assets/startup-map.svg", "Scritti di Livio Q"],
  "academy.html": ["assets/startup-map.svg", "Mestiere in uscita"],
  "agency.html": ["assets/poc-collage.jpg", "Candidati e processo"],
  "onshoring.html": ["assets/sardinia-collage.jpg", "Sede, visto, casa, fondi"],
  "connessioni.html": ["assets/poc-collage.jpg", "Rete della community"],
  "chi-siamo.html": ["assets/sardinia-collage.jpg", "Dal 2009 a Cagliari"],
  "contatti.html": ["assets/sardinia-collage.jpg", "Viale La Plaia 15"],
  "incubatore.html": ["assets/startup-map.svg", "Incubatore certificato"],
  "techtalents.html": ["assets/poc-collage.jpg", "Matching tech"],
};

const teamSlugs = {
  "mario-mariani": "mario_mariani",
  "livio-quintavalle": "livio_quintavalle",
  "benedetta-mariani": "benedetta_mariani",
  "giulia-onano": "giulia_onano",
  "maria-adelaide-lai": "maria_adelaide_lai",
};

function currentFile() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function teamKey(src) {
  return (src || "").replace(/^assets\/team\//, "").replace(/\.(jpg|jpeg|png)$/i, "").replace(/_/g, "-");
}

function teamCandidates(src) {
  const key = teamKey(src);
  const slug = teamSlugs[key];
  if (!slug) return [src];
  return [
    `assets/team/${slug}.jpeg`,
    `assets/team/${slug}.jpg`,
    `assets/team/${slug}.png`,
    `https://www.thenetvalue.com/wp-content/uploads/2023/09/${slug}.jpeg`,
  ];
}

function ensureFavicon() {
  const links = [
    ["icon", "image/x-icon", "assets/favicon/favicon.ico", null],
    ["icon", "image/png", "assets/favicon/favicon-32.png", "32x32"],
    ["icon", "image/png", "assets/favicon/favicon-16.png", "16x16"],
    ["apple-touch-icon", null, "assets/favicon/apple-touch-icon.png", "180x180"],
    ["icon", "image/png", "assets/favicon/icon-192.png", "192x192"],
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
  const file = currentFile();
  const spec = visuals[file];
  if (!spec) return;
  const [src, cap] = spec;
  const existing = document.querySelector(".visual-frame img");
  if (existing) {
    existing.src = src;
    existing.alt = cap;
    const capEl = existing.parentElement.querySelector("figcaption");
    if (capEl) capEl.textContent = cap;
    return;
  }
  const hero = document.querySelector("section.hero .wrap");
  if (!hero) return;
  if (hero.querySelector(".signal-panel")) return;
  const copy = document.createElement("div");
  while (hero.firstChild) copy.appendChild(hero.firstChild);
  hero.appendChild(copy);
  hero.classList.add("hero-grid");
  const fig = document.createElement("figure");
  fig.className = "visual-frame";
  fig.innerHTML = `<img src="${src}" alt="${cap}"><figcaption>${cap}</figcaption>`;
  hero.appendChild(fig);
}

function loadFirst(el, urls, alt) {
  const tryNext = (i) => {
    if (i >= urls.length) return;
    const img = new Image();
    img.onload = () => {
      el.innerHTML = "";
      img.alt = alt || "";
      el.appendChild(img);
    };
    img.onerror = () => tryNext(i + 1);
    img.src = urls[i];
  };
  tryNext(0);
}

function mountPhotos() {
  document.querySelectorAll("[data-photo]").forEach((el) => {
    loadFirst(el, teamCandidates(el.getAttribute("data-photo")), el.getAttribute("data-alt"));
  });
  document.querySelectorAll("[data-fill]").forEach((el) => {
    loadFirst(el, [el.getAttribute("data-fill")], el.getAttribute("data-alt"));
  });
}

function mount() {
  ensureFavicon();
  const file = currentFile();
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `<div class="wrap header-inner"><a class="logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><button class="menu-toggle" type="button" aria-label="Menu">Menu</button><nav class="primary">${pages.map(([href,label])=>`<a href="${href}" ${href===file?'aria-current="page"':''}>${label}</a>`).join("")}<a class="btn" href="contatti.html">Parliamone</a></nav></div>`;
    header.querySelector(".menu-toggle").addEventListener("click", () => header.querySelector("nav.primary").classList.toggle("open"));
  }
  if (footer) {
    footer.innerHTML = `<div class="wrap footer-grid"><div><a class="logo footer-logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><br>Viale La Plaia 15, Cagliari</div><div><strong>Offerte</strong><a href="startup.html">Startup</a><a href="aziende.html">Aziende</a><a href="coworking.html">Coworking</a><a href="onshoring.html">Onshoring</a></div><div><strong>Ancora</strong><a href="open-innovation.html">Open innovation</a><a href="agency.html">Agency</a><a href="academy.html">Academy</a><a href="consulenza-ai.html">Consulenza AI</a></div><div><strong>Contatti</strong><a href="mailto:info@thenetvalue.com">info@thenetvalue.com</a><a href="chi-siamo.html">Chi siamo</a></div></div><div class="wrap">© ${new Date().getFullYear()} The Net Value</div>`;
  }
  mountVisual();
  mountPhotos();
}
document.addEventListener("DOMContentLoaded", mount);
