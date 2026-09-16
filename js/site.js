const pages = [
  ["index.html", "Home"],
  ["startup.html", "Startup"],
  ["aziende.html", "Aziende"],
  ["consulenza-ai.html", "Consulenza AI"],
  ["agency.html", "Agency"],
  ["academy.html", "Academy"],
  ["eventi.html", "Eventi"],
  ["blog.html", "Blog"],
  ["chi-siamo.html", "Chi siamo"],
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
    header.innerHTML = `
      <div class="wrap header-inner">
        <a class="logo" href="index.html">The Net Value<span>.</span></a>
        <button class="menu-toggle" type="button" aria-label="Menu">Menu</button>
        <nav class="primary">
          ${pages.map(([href, label]) =>
            `<a href="${href}" ${href === file ? 'aria-current="page"' : ""}>${label}</a>`
          ).join("")}
          <a class="btn" href="contatti.html">Parliamone</a>
        </nav>
      </div>`;
    header.querySelector(".menu-toggle").addEventListener("click", () => {
      header.querySelector("nav.primary").classList.toggle("open");
    });
  }
  if (footer) {
    footer.innerHTML = `
      <div class="wrap footer-grid">
        <div>
          <strong>The Net Value</strong>
          Viale La Plaia 15, Cagliari<br>
          Incubatore certificato · coworking · academy · consulenza
        </div>
        <div>
          <strong>Offerte</strong>
          <a href="startup.html">Per startup</a>
          <a href="aziende.html">Per aziende</a>
          <a href="consulenza-ai.html">Consulenza AI</a>
          <a href="agency.html">Agency hiring</a>
        </div>
        <div>
          <strong>Luogo</strong>
          <a href="coworking.html">Coworking</a>
          <a href="academy.html">Academy</a>
          <a href="eventi.html">Eventi</a>
          <a href="blog.html">Blog</a>
        </div>
        <div>
          <strong>Contatti</strong>
          <a href="mailto:info@thenetvalue.com">info@thenetvalue.com</a>
          <a href="contatti.html">Form</a>
        </div>
      </div>
      <div class="wrap">© ${new Date().getFullYear()} The Net Value · IT first, EN in arrivo</div>`;
  }
}

document.addEventListener("DOMContentLoaded", mount);
