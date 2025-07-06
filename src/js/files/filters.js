export default function filters() {
  const filters = document.querySelector("#filters");

  if (filters) {
    const btnOpen = document.querySelector("#filters-open");
    const btnClose = document.querySelector("#filters-close");
    const overlay = document.querySelector("#filters-overlay");

    filters.addEventListener("click", e => e.stopPropagation());

    overlay.addEventListener("click", handleClose);

    btnClose.addEventListener("click", handleClose);
    btnOpen.addEventListener("click", handleOpen);

    function handleOpen() {
      document.body.classList.add("body-hidden");

      overlay.classList.add("_active");
      filters.classList.add("_open");
    }

    function handleClose() {
      document.body.classList.remove("body-hidden");

      filters.classList.remove("_open");
      overlay.classList.remove("_active");
    }
  }
}
