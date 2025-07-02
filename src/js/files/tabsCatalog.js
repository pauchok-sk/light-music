export default function tabsCatalog() {
  const catalog = document.querySelector("#catalog");

  if (catalog) {
    const buttons = catalog.querySelectorAll("[data-tab-catalog]");
    const tabs = catalog.querySelectorAll("[data-tab-catalog-content]");

    buttons.forEach(btn => {
      btn.addEventListener("mouseover", () => {

        if (btn.classList.contains("_active")) return;

        const id = btn.dataset.tabCatalog;
        const currentTab = catalog.querySelector(`[data-tab-catalog-content="${id}"]`);

        tabs.forEach(t => t.classList.remove("_active"));
        buttons.forEach(b => b.classList.remove("_active"));

        btn.classList.add("_active");
        currentTab.classList.add("_active");
        currentTab.style.opacity = "0";

        setTimeout(() =>  currentTab.style.opacity = "1", 50)
      })
    })
  }
}