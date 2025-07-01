export default function catalogChange() {
  const catalog = document.querySelector("#catalog");

  if (catalog) {
    const btnCatalog = document.querySelector("#btn-catalog");
    const header = document.querySelector(".header");
    const headerLine = document.querySelector(".header-line");

    catalog.addEventListener("click", (e) => e.stopPropagation());

    document.body.addEventListener("click", () => {
      if (catalog.classList.contains("_open")) {
        closeCatalog();
      }
    });

    btnCatalog.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!btnCatalog.classList.contains("_active")) {
        openCatalog();
      } else {
        closeCatalog();
      }
    });

    changeOffsetTop();
    window.addEventListener("resize", changeOffsetTop);

    function openCatalog() {
      catalog.classList.add("_open");
      btnCatalog.classList.add("_active");

      if (!header.classList.contains("_scroll")) {
        header.classList.add("_shadow");
      }

      document.body.classList.add("body-hidden");
    }

    function closeCatalog() {
      catalog.classList.remove("_open");
      btnCatalog.classList.remove("_active");

      if (!header.classList.contains("_scroll")) {
        header.classList.remove("_shadow");
      }

      document.body.classList.remove("body-hidden");
    }

    function changeOffsetTop() {
      const offsetTop = header.clientHeight + headerLine.clientHeight;
      catalog.style.top = offsetTop + "px";
    }
  }
}
