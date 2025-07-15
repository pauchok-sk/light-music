export default function spollersSimple() {
  const buttons = document.querySelectorAll("[data-spoller-btn]");

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("_active")
      })
    })
  }
}