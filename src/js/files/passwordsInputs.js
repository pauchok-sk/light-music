export default function passwordsInputs() {
  const buttons = document.querySelectorAll(".password-btn");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.closest(".input-wrapper").querySelector(".input");

        if (btn.classList.contains("_active")) {
          btn.classList.remove("_active");
          input.type = "password";
        } else {
          btn.classList.add("_active");
          input.type = "text";
        }
      });
    });
  }
}
