export default function dropdown() {
  const buttons = document.querySelectorAll(".dropdown-btn");

  if (buttons.length) {
    const dropdowns = document.querySelectorAll(".dropdown");
    const buttonsClose = document.querySelectorAll(".dropdown-close");

    dropdowns.forEach((d) =>
      d.addEventListener("click", (e) => e.stopPropagation())
    );

    document.body.addEventListener("click", () => handleClose());

    buttonsClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentDropdown = btn.closest(".dropdown");
        handleClose(currentDropdown);
      });
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentDropdown = btn.closest(".dropdown");

        if (currentDropdown.classList.contains("_open")) {
          handleClose(currentDropdown);
        } else {
          handleOpen(currentDropdown);
        }
      });
    });

    function handleOpen(currentDropdown) {
      currentDropdown.classList.add("_open");
    }
    function handleClose(currentDropdown) {
      if (currentDropdown) {
        currentDropdown.classList.remove("_open");
      } else {
        document.querySelector(".dropdown._open")?.classList.remove("_open");
      }
    }
  }
}
