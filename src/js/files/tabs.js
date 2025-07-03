export default function tabs() {
  const buttons = document.querySelectorAll("[data-tab-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest(".tabs");
        const tabId = btn.dataset.tabBtn;
        const allButtons = container.querySelectorAll("[data-tab-btn]");
        const allTabs = container.querySelectorAll("[data-tab]");

        const currentTab = container.querySelector(`[data-tab="${tabId}"]`);

        allTabs.forEach((t) => t.classList.remove("_active"));
        currentTab.classList.add("_active");

        allButtons.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");
      });
    });
  }
}