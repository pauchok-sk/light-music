export default function reviewsOpen() {
  const buttons = document.querySelectorAll(".card-review__more-btn");

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const text = btn.closest(".card-review").querySelector(".text");
        
        if (btn.classList.contains("_active")) {
          text.classList.remove("_open");
          btn.classList.remove("_active");
          btn.textContent = "Развернуть";
        } else {
          text.classList.add("_open");
          btn.classList.add("_active");
          btn.textContent = "Свернуть";
        }
      })
    })
  }
}