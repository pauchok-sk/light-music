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
          clickable: true,
        },
      });
    });
  }

  const categoriesSlider = document.querySelector(".s-categories__slider");

  if (categoriesSlider) {
    const swiper = new Swiper(categoriesSlider, {
      speed: 800,
      spaceBetween: 10,
      slidesPerView: "auto",
      autoplay: {
        delay: 3500,
      },
      navigation: {
        prevEl: ".s-categories .slider-btn._prev",
        nextEl: ".s-categories .slider-btn._next",
      },
      breakpoints: {
        1600: {
          spaceBetween: 20,
          slidesPerView: 6,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      },
    });
  }

  const brandsSlider = document.querySelector(".s-brands__slider");

  if (brandsSlider) {
    const swiper = new Swiper(brandsSlider, {
      speed: 800,
      spaceBetween: 10,
      slidesPerView: "auto",
      autoplay: {
        delay: 3500,
      },
      navigation: {
        prevEl: ".s-brands .slider-btn._prev",
        nextEl: ".s-brands .slider-btn._next",
      },
      breakpoints: {
        1600: {
          spaceBetween: 20,
          slidesPerView: 6,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      },
    });
  }

  const newsSlider = document.querySelector(".s-news__slider");

  if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
      speed: 800,
      spaceBetween: 20,
      slidesPerView: "auto",
      autoplay: {
        delay: 3000,
      },
      navigation: {
        prevEl: ".s-news .slider-btn._prev",
        nextEl: ".s-news .slider-btn._next",
      },
      breakpoints: {
        1600: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }

  const productionSlider = document.querySelector(".s-production__slider");

  if (productionSlider) {
    const swiper = new Swiper(productionSlider, {
      speed: 800,
      spaceBetween: 20,
      initialSlide: 2,
      navigation: {
        prevEl: ".s-production .slider-btn._prev",
        nextEl: ".s-production .slider-btn._next",
      },
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".s-production .slider-pagination",
        clickable: true,
      },
    });
  }

  const certificatesSlider = document.querySelector(".s-certificates__slider");

  if (certificatesSlider) {
    const swiper = new Swiper(certificatesSlider, {
      speed: 800,
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-certificates .slider-btn._prev",
        nextEl: ".s-certificates .slider-btn._next",
      },
      autoplay: {
        delay: 3200,
      },
      breakpoints: {
        1600: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }

  const reviewsSlider = document.querySelector(".s-reviews__slider");

  if (reviewsSlider) {
    const swiper = new Swiper(reviewsSlider, {
      speed: 800,
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-reviews .slider-btn._prev",
        nextEl: ".s-reviews .slider-btn._next",
      },
      autoplay: {
        delay: 3200,
      },
      breakpoints: {
        1600: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
    });
  }
}
