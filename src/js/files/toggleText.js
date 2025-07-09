export default function toggleText() {
  const buttons = document.querySelectorAll(".toggle-text-btn");

  if (buttons.length) {
    buttons.forEach(btn => {
      const textBtn = btn.textContent;
      btn.addEventListener("click", () => {
        const toggleText = btn.previousElementSibling;

        if (toggleText.classList.contains("_open")) {
          toggleText.classList.remove("_open");
          btn.textContent = textBtn;
        } else {
          toggleText.classList.add("_open");
          btn.textContent = "Скрыть";
        }
      })
    })
  }
}
