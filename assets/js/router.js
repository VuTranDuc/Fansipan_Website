// Load NAV and FOOTER
loadComponent("nav-placeholder", "components/nav.html");
loadComponent("footer-placeholder", "components/footer.html");

// === Load Component ===
function loadComponent(id, path) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`${path} not found`);
      return res.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => {
      console.error(`Error loading ${path}:`, err);
    });
}

// === Load Page ===
function loadPage() {

  const hash = window.location.hash || "#home";
  const page = hash.replace("#", "");

  let folder = page;

  let htmlPath = `./pages/${folder}/${page}.html`;
  let cssPath = `./pages/${folder}/${page}.css`;
  let jsPath = `./pages/${folder}/${page}.js`;

  if (page.startsWith("services-")) {
    folder = "services";
    htmlPath = `./pages/${folder}/${page}/${page}.html`;
    cssPath = `./pages/${folder}/${page}/${page}.css`;
    jsPath = `./pages/${folder}/${page}/${page}.js`;
  }

  // console.log({ htmlPath, cssPath, jsPath });

  // Load HTML content
  fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
      loadPageCSS(cssPath);
      loadPageJS(jsPath);
    })
    .catch(err => {
      document.getElementById("main-content").innerHTML = "<h2>404 - Page not found</h2>";
      console.error(err);
    });
}

// === Load CSS (one per page) ===
function loadPageCSS(cssPathParam) {
  const oldCss = document.getElementById("page-style");
  if (oldCss) oldCss.remove();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssPathParam;
  link.id = "page-style";

  document.head.appendChild(link);
}

// === Load JS (one per page) ===
function loadPageJS(jsPathParam) {
  const oldScript = document.getElementById("page-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = jsPathParam;
  script.id = "page-script";

  document.body.appendChild(script);
}


// === Events ===
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
