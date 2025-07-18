export default function filtersSearch() {
  const form = document.querySelector(".filters .form-search");
  
  if (form) {
    const input = form.querySelector(".input");

    const filters = form.nextElementSibling.querySelectorAll(".label-check")

    const formClear = form.querySelector(".form-search__clear");

    formClear.addEventListener("click", () => {
      filters.forEach(f => f.style.display = "flex");
    })

    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      filters.forEach(filter => {
        if (filter.textContent.toLocaleLowerCase().includes(value)) {
          filter.style.display = "flex";
        } else {
          filter.style.display = "none";
        }
      })
    })
  }
}