export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header) {
    const offsetTop = document.querySelector(".header-line").clientHeight;

    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > offsetTop) {
        header.classList.add("_shadow");
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_shadow");
        header.classList.remove("_scroll");
      }

      lastScrollTop = scrollTop;
    });
  }
}
