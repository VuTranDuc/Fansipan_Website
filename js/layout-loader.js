// Import NAV
fetch("../components/nav.html") 
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav-placeholder").innerHTML = data;
    });

// Import FOOTER
fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });

// Hàm đổi trang
function loadPage(pageName) {
    fetch(`/pages/${pageName}/${pageName}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("main-content").innerHTML = data;

            // Load CSS tương ứng
            let oldCss = document.getElementById("page-style");
            if (oldCss) oldCss.remove();

            let css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = `/pages/${pageName}/${pageName}.css`;
            css.id = "page-style";
            document.head.appendChild(css);
        });
}
// Mặc định load home
loadPage("home");