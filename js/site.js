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

function currentFile() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
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

function mount() {
  const file = currentFile();
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `<div class="wrap header-inner"><a class="logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><button class="menu-toggle" type="button" aria-label="Menu">Menu</button><nav class="primary">${pages.map(([href,label])=>`<a href="${href}" ${href===file?'aria-current="page"':''}>${label}</a>`).join("")}<a class="btn" href="contatti.html">Parliamone</a></nav></div>`;
    header.querySelector(".menu-toggle").addEventListener("click", () => header.querySelector("nav.primary").classList.toggle("open"));
  }
  if (footer) {
    footer.innerHTML = `<div class="wrap footer-grid"><div><a class="logo footer-logo" href="index.html"><img src="assets/logo_tnv_dark_2019.png" alt="The Net Value"></a><br>Viale La Plaia 15, Cagliari</div><div><strong>Offerte</strong><a href="startup.html">Startup</a><a href="aziende.html">Aziende</a><a href="coworking.html">Coworking</a><a href="onshoring.html">Onshoring</a></div><div><strong>Ancora</strong><a href="open-innovation.html">Open innovation</a><a href="connessioni.html">Connessioni</a><a href="consulenza-ai.html">Consulenza AI</a></div><div><strong>Contatti</strong><a href="mailto:info@thenetvalue.com">info@thenetvalue.com</a></div></div><div class="wrap">© ${new Date().getFullYear()} The Net Value</div>`;
  }
  mountVisual();
}
document.addEventListener("DOMContentLoaded", mount);
