export default function formSearch() {
  const forms = document.querySelectorAll(".form-search");

  if (forms.length) {
    forms.forEach((form) => {
      const input = form.querySelector("input");
      const clear = form.querySelector(".form-search__clear");

      input.addEventListener("input", (e) => {
        if (e.target.value) {
          form.classList.add("_search");
        } else {
          form.classList.remove("_search");
        }
      });

      clear.addEventListener("click", () => {
        input.value = "";
        form.classList.remove("_search");
      });
    });
  }
}
