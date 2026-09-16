const pages = [
  ["startup.html", "Startup"],
  ["aziende.html", "Aziende"],
  ["coworking.html", "Coworking"],
  ["open-innovation.html", "Open innovation"],
  ["consulenza-ai.html", "Consulenza AI"],
  ["eventi.html", "Eventi"],
  ["blog.html", "Blog"],
];
function currentFile() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}
function mount() {
  const file = currentFile();
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `<div class="wrap header-inner"><a class="logo" href="index.html">The Net Value<span>.</span></a><button class="menu-toggle" type="button" aria-label="Menu">Menu</button><nav class="primary">${pages.map(([href,label])=>`<a href="${href}" ${href===file?'aria-current="page"':''}>${label}</a>`).join("")}<a class="btn" href="contatti.html">Parliamone</a></nav></div>`;
    header.querySelector(".menu-toggle").addEventListener("click", () => header.querySelector("nav.primary").classList.toggle("open"));
  }
  if (footer) {
    footer.innerHTML = `<div class="wrap footer-grid"><div><a class="logo" href="index.html">The Net Value<span>.</span></a><br>Viale La Plaia 15, Cagliari</div><div><strong>Offerte</strong><a href="startup.html">Startup</a><a href="aziende.html">Aziende</a><a href="coworking.html">Coworking</a><a href="onshoring.html">Onshoring</a></div><div><strong>Ancora</strong><a href="open-innovation.html">Open innovation</a><a href="connessioni.html">Connessioni</a><a href="consulenza-ai.html">Consulenza AI</a></div><div><strong>Contatti</strong><a href="mailto:info@thenetvalue.com">info@thenetvalue.com</a></div></div><div class="wrap">© ${new Date().getFullYear()} The Net Value</div>`;
  }
}
document.addEventListener("DOMContentLoaded", mount);
