export default function sliders() {
  const headerCategoriesSlider = document.querySelector(
    ".header-categories__slider"
  );

  if (headerCategoriesSlider) {
    const swiper = new Swiper(headerCategoriesSlider, {
      speed: 700,
      spaceBetween: 5,
      slidesPerView: "auto",
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        576: {
          spaceBetween: 20,
        },
        992: {
          spaceBetween: 40,
        },
      },
    });
  }
}
