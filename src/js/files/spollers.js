export default function spollers() {
  const buttons = document.querySelectorAll("[data-spoller]");

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("_active")
      })
    })
  }
}