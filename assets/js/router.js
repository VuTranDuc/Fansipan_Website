// === load component ===
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

// Load NAV and FOOTER
loadComponent("nav-placeholder", "components/nav.html");
loadComponent("footer-placeholder", "components/footer.html");

// === load page ===
function loadPage() {
  const hash = window.location.hash || "#home";
  const page = hash.replace("#", "");
  const htmlPath = `./pages/${page}/${page}.html`;
  const cssPath = `./pages/${page}/${page}.css`;

  // Load HTML content
  fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
      loadPageCSS(cssPath);
    })
    .catch(err => {
      document.getElementById("main-content").innerHTML = "<h2>404 - Page not found</h2>";
      console.error(err);
    });
}

// Load corresponding CSS file
function loadPageCSS(cssPath) {
  console.log("Loading CSS from:", cssPath);

  const oldCss = document.getElementById("page-style");
  if (oldCss) oldCss.remove();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssPath; // dùng luôn đường dẫn đã truyền
  link.id = "page-style";

  document.head.appendChild(link);
}

// Events
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);


