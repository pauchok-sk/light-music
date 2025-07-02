export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header) {
    const offsetTop = document.querySelector(".header-line").clientHeight;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > offsetTop) {
        header.classList.add("_shadow");
      } else {
        header.classList.remove("_shadow");
      }
    });
  }
}
