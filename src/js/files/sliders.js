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

  const heroReklamSlider = document.querySelector(".hero__reklam-slider");

  if (heroReklamSlider) {
    const swiper = new Swiper(heroReklamSlider, {
      speed: 800,
      spaceBetween: 15,
      autoplay: {
        delay: 3500,
      },
      navigation: {
        prevEl: ".hero__reklam-slider .slider-btn._prev",
        nextEl: ".hero__reklam-slider .slider-btn._next",
      },
      pagination: {
        el: ".hero__reklam .slider-pagination",
        clickable: true,
      },
    });
  }

  const heroHitSlider = document.querySelector(".hero__hit-slider");

  if (heroHitSlider) {
    const swiper = new Swiper(heroHitSlider, {
      speed: 800,
      spaceBetween: 10,
      slidesPerView: "auto",
      autoplay: {
        delay: 2500,
      },
      navigation: {
        prevEl: ".hero__hit .slider-btn._prev",
        nextEl: ".hero__hit .slider-btn._next",
      },
      pagination: {
        el: ".hero__hit .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: {
          spaceBetween: 15,
          slidesPerView: 1,
        },
        767: {
          spaceBetween: 15,
          slidesPerView: "auto",
        },
      },
    });
  }

  const recSliders = document.querySelectorAll(".s-rec__slider");

  if (recSliders.length) {
    recSliders.forEach((slider) => {
      const autoplayDelay = +slider.dataset.autoplayDelay;

      const swiper = new Swiper(slider, {
        speed: 800,
        spaceBetween: 20,
        slidesPerView: "auto",
        autoplay: {
          delay: autoplayDelay || 3000,
        },
        navigation: {
          prevEl: slider
            .closest(".s-rec__slider-wrapper")
            .querySelector(".slider-btn._prev"),
          nextEl: slider
            .closest(".s-rec__slider-wrapper")
            .querySelector(".slider-btn._next"),
        },
        breakpoints: {
          1600: {
            spaceBetween: 20,
            slidesPerView: 6,
          },
        },
      });
    });
  }

  const reklamSliders = document.querySelectorAll(".s-reklam__slider");

  if (reklamSliders.length) {
    reklamSliders.forEach((slider) => {
      const autoplayDelay = +slider.dataset.autoplayDelay;

      const swiper = new Swiper(slider, {
        speed: 800,
        spaceBetween: 20,
        initialSlide: 2,
        autoplay: {
          delay: autoplayDelay || 3000,
        },
        navigation: {
          prevEl: slider
            .closest(".s-reklam__slider-wrapper")
            .querySelector(".slider-btn._prev"),
          nextEl: slider
            .closest(".s-reklam__slider-wrapper")
            .querySelector(".slider-btn._next"),
        },
        pagination: {
          el: slider.nextElementSibling,
          clickable: true
        }
      });
    });
  }
}
