(() => {
    "use strict";
    function catalogChange() {
        const catalog = document.querySelector("#catalog");
        if (catalog) {
            const btnCatalog = document.querySelector("#btn-catalog");
            const header = document.querySelector(".header");
            const headerLine = document.querySelector(".header-line");
            catalog.addEventListener("click", e => e.stopPropagation());
            document.body.addEventListener("click", () => {
                if (catalog.classList.contains("_open")) closeCatalog();
            });
            btnCatalog.addEventListener("click", e => {
                e.stopPropagation();
                if (!btnCatalog.classList.contains("_active")) openCatalog(); else closeCatalog();
            });
            changeOffsetTop();
            window.addEventListener("resize", changeOffsetTop);
            function openCatalog() {
                catalog.classList.add("_open");
                btnCatalog.classList.add("_active");
                changeOffsetTop();
                if (!header.classList.contains("_scroll")) header.classList.add("_shadow");
                document.body.classList.add("body-hidden");
            }
            function closeCatalog() {
                catalog.classList.remove("_open");
                btnCatalog.classList.remove("_active");
                if (!header.classList.contains("_scroll")) header.classList.remove("_shadow");
                document.body.classList.remove("body-hidden");
            }
            function changeOffsetTop() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let offsetTop = header.clientHeight + headerLine.clientHeight;
                if (scrollTop >= headerLine.clientHeight) offsetTop = header.clientHeight; else if (scrollTop > 0 && scrollTop < headerLine.clientHeight) offsetTop = header.clientHeight + scrollTop;
                catalog.style.top = offsetTop + "px";
            }
        }
    }
    function dropdown() {
        const buttons = document.querySelectorAll(".dropdown-btn");
        if (buttons.length) {
            const dropdowns = document.querySelectorAll(".dropdown");
            const buttonsClose = document.querySelectorAll(".dropdown-close");
            dropdowns.forEach(d => d.addEventListener("click", e => e.stopPropagation()));
            document.body.addEventListener("click", () => handleClose());
            buttonsClose.forEach(btn => {
                btn.addEventListener("click", () => {
                    const currentDropdown = btn.closest(".dropdown");
                    handleClose(currentDropdown);
                });
            });
            buttons.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.stopPropagation();
                    const currentDropdown = btn.closest(".dropdown");
                    if (currentDropdown.classList.contains("_open")) handleClose(currentDropdown); else handleOpen(currentDropdown);
                });
            });
            function handleOpen(currentDropdown) {
                currentDropdown.classList.add("_open");
            }
            function handleClose(currentDropdown) {
                if (currentDropdown) currentDropdown.classList.remove("_open"); else document.querySelector(".dropdown._open")?.classList.remove("_open");
            }
        }
    }
    function filters() {
        const filters = document.querySelector("#filters");
        if (filters) {
            const btnOpen = document.querySelector("#filters-open");
            const btnClose = document.querySelector("#filters-close");
            const overlay = document.querySelector("#filters-overlay");
            filters.addEventListener("click", e => e.stopPropagation());
            overlay.addEventListener("click", handleClose);
            btnClose.addEventListener("click", handleClose);
            btnOpen.addEventListener("click", handleOpen);
            function handleOpen() {
                document.body.classList.add("body-hidden");
                overlay.classList.add("_active");
                filters.classList.add("_open");
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                filters.classList.remove("_open");
                overlay.classList.remove("_active");
            }
        }
    }
    function headerScroll() {
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
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function productCounter() {
        const inputControls = document.querySelectorAll(".input-control-counter");
        if (inputControls.length) inputControls.forEach(control => {
            const btnMinus = control.querySelector(".input-counter._minus");
            const btnPlus = control.querySelector(".input-counter._plus");
            const input = control.querySelector("input");
            btnPlus.addEventListener("click", changePlus);
            btnMinus.addEventListener("click", changeMinus);
            input.addEventListener("input", changeInput);
            function changePlus() {
                input.value = +input.value + 1;
                if (+input.value > 1) btnMinus.classList.remove("_disable");
            }
            function changeMinus() {
                input.value = +input.value - 1;
                if (+input.value === 1) btnMinus.classList.add("_disable");
            }
            function changeInput() {
                if (+input.value <= 1) btnMinus.classList.add("_disable"); else btnMinus.classList.remove("_disable");
            }
        });
    }
    function productMoreTabs() {
        const productDescrBtn = document.querySelector("#product-descr-more");
        if (productDescrBtn) {
            const text = document.querySelector("#product-descr");
            const textBtn = productDescrBtn.textContent;
            productDescrBtn.addEventListener("click", () => {
                if (text.classList.contains("_open")) hide(); else open();
            });
            function hide() {
                text.classList.remove("_open");
                productDescrBtn.textContent = textBtn;
            }
            function open() {
                text.classList.add("_open");
                productDescrBtn.textContent = "Скрыть";
            }
        }
        const productSpecBtn = document.querySelector("#product-specifications-more");
        if (productSpecBtn && window.matchMedia("(max-width: 767px)").matches) {
            const specifications = document.querySelector("#product-specifications");
            const textBtn = productDescrBtn.textContent;
            productSpecBtn.addEventListener("click", () => {
                if (specifications.classList.contains("_open")) hide(); else open();
            });
            function hide() {
                specifications.classList.remove("_open");
                productSpecBtn.textContent = textBtn;
            }
            function open() {
                specifications.classList.add("_open");
                productSpecBtn.textContent = "Скрыть";
            }
        }
    }
    function reviewsOpen() {
        const buttons = document.querySelectorAll(".card-review__more-btn");
        if (buttons.length) buttons.forEach(btn => {
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
            });
        });
    }
    class Scrollable {
        constructor(selector, options) {
            let defaultOptions = {
                wheelScrolling: true
            };
            this.container = document.querySelector(selector);
            this.options = Object.assign(defaultOptions, options);
            if (!this.container) return;
            this.childrensSize = Array.from(this.container.children).reduce((sum, item) => sum + item.offsetWidth, 0);
            this.container.classList.add("_scrollable");
            if (this.container.clientWidth < this.childrensSize) this.container.style = "cursor: grab";
            this.isDragging = false;
            this.startX = null;
            this.scrollLeft = null;
            this.events();
        }
        events() {
            if (this.container) {
                this.container.addEventListener("mousedown", e => {
                    this.isDragging = true;
                    this.startX = e.pageX - this.container.offsetLeft;
                    this.scrollLeft = this.container.scrollLeft;
                });
                this.container.addEventListener("mouseup", e => {
                    this.isDragging = false;
                });
                this.container.addEventListener("mousemove", e => {
                    if (!this.isDragging) return;
                    const x = e.pageX - this.container.offsetLeft;
                    const walkX = (x - this.startX) * 1;
                    this.container.scrollLeft = this.scrollLeft - walkX;
                });
                this.container.addEventListener("mouseleave", e => {
                    if (this.isDragging) this.isDragging = false;
                });
                if (this.options.wheelScrolling) this.container.addEventListener("mousewheel", e => {
                    e.preventDefault();
                    this.container.scrollLeft += e.deltaY;
                });
            }
        }
    }
    function scrollables() {
        if (window.matchMedia("(max-width: 767px)").matches) new Scrollable(".s-history__nav");
        new Scrollable(".s-archive-reviews__nav");
    }
    function sliders() {
        const headerCategoriesSlider = document.querySelector(".header-categories__slider");
        if (headerCategoriesSlider) {
            new Swiper(headerCategoriesSlider, {
                speed: 700,
                spaceBetween: 5,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3e3
                },
                breakpoints: {
                    576: {
                        spaceBetween: 20
                    },
                    992: {
                        spaceBetween: 40
                    }
                }
            });
        }
        const heroReklamSlider = document.querySelector(".hero__reklam-slider");
        if (heroReklamSlider) {
            new Swiper(heroReklamSlider, {
                speed: 800,
                spaceBetween: 15,
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3500
                },
                loop: true,
                navigation: {
                    prevEl: ".hero__reklam-slider .slider-btn._prev",
                    nextEl: ".hero__reklam-slider .slider-btn._next"
                },
                pagination: {
                    el: ".hero__reklam .slider-pagination",
                    clickable: true
                }
            });
        }
        const heroHitSlider = document.querySelector(".hero__hit-slider");
        if (heroHitSlider) {
            new Swiper(heroHitSlider, {
                speed: 800,
                spaceBetween: 10,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 2500
                },
                loop: true,
                navigation: {
                    prevEl: ".hero__hit .slider-btn._prev",
                    nextEl: ".hero__hit .slider-btn._next"
                },
                pagination: {
                    el: ".hero__hit .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 15,
                        slidesPerView: 1
                    },
                    767: {
                        spaceBetween: 15,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const recSliders = document.querySelectorAll(".s-rec__slider");
        if (recSliders.length) recSliders.forEach(slider => {
            const autoplayDelay = +slider.dataset.autoplayDelay;
            new Swiper(slider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: autoplayDelay || 3e3
                },
                navigation: {
                    prevEl: slider.closest(".s-rec__slider-wrapper").querySelector(".slider-btn._prev"),
                    nextEl: slider.closest(".s-rec__slider-wrapper").querySelector(".slider-btn._next")
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 6
                    }
                }
            });
        });
        const reklamSliders = document.querySelectorAll(".s-reklam__slider");
        if (reklamSliders.length) reklamSliders.forEach(slider => {
            const autoplayDelay = +slider.dataset.autoplayDelay;
            new Swiper(slider, {
                speed: 800,
                spaceBetween: 20,
                initialSlide: 2,
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: autoplayDelay || 3e3
                },
                loop: true,
                navigation: {
                    prevEl: slider.closest(".s-reklam__slider-wrapper").querySelector(".slider-btn._prev"),
                    nextEl: slider.closest(".s-reklam__slider-wrapper").querySelector(".slider-btn._next")
                },
                pagination: {
                    el: slider.nextElementSibling,
                    clickable: true
                }
            });
        });
        const categoriesSlider = document.querySelector(".s-categories__slider");
        if (categoriesSlider) {
            new Swiper(categoriesSlider, {
                speed: 800,
                spaceBetween: 10,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3500
                },
                loop: true,
                navigation: {
                    prevEl: ".s-categories .slider-btn._prev",
                    nextEl: ".s-categories .slider-btn._next"
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 6
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const brandsSlider = document.querySelector(".s-brands__slider");
        if (brandsSlider) {
            new Swiper(brandsSlider, {
                speed: 800,
                spaceBetween: 10,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3e3
                },
                navigation: {
                    prevEl: ".s-brands .slider-btn._prev",
                    nextEl: ".s-brands .slider-btn._next"
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 6
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const newsSlider = document.querySelector(".s-news__slider");
        if (newsSlider) {
            new Swiper(newsSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: "auto",
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3e3
                },
                navigation: {
                    prevEl: ".s-news .slider-btn._prev",
                    nextEl: ".s-news .slider-btn._next"
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    }
                }
            });
        }
        const productionSlider = document.querySelector(".s-production__slider");
        if (productionSlider) {
            new Swiper(productionSlider, {
                speed: 800,
                spaceBetween: 20,
                initialSlide: 2,
                navigation: {
                    prevEl: ".s-production .slider-btn._prev",
                    nextEl: ".s-production .slider-btn._next"
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3e3
                },
                pagination: {
                    el: ".s-production .slider-pagination",
                    clickable: true
                }
            });
        }
        const certificatesSlider = document.querySelector(".s-certificates__slider");
        if (certificatesSlider) {
            new Swiper(certificatesSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-certificates .slider-btn._prev",
                    nextEl: ".s-certificates .slider-btn._next"
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3200
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    }
                }
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
                    nextEl: ".s-reviews .slider-btn._next"
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 3200
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
            });
            const buttonsStop = reviewsSlider.querySelectorAll(".card-review__more-btn");
            if (buttonsStop.length) buttonsStop.forEach(btn => {
                btn.addEventListener("click", () => {
                    swiper.autoplay.stop();
                });
            });
        }
        const productSlider = document.querySelector(".s-product__slider");
        if (productSlider) {
            const thumbSlider = document.querySelector(".s-product__thumb-slider");
            const thumbSwiper = new Swiper(thumbSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: 4,
                direction: "vertical",
                loop: true,
                navigation: {
                    prevEl: ".s-product__gallery .slider-btn._prev",
                    nextEl: ".s-product__gallery .slider-btn._next"
                }
            });
            new Swiper(productSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: 1,
                thumbs: {
                    swiper: thumbSwiper
                },
                pagination: {
                    el: ".s-product__gallery .slider-pagination"
                }
            });
        }
    }
    function tabs() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelectorAll("[data-tab-btn]");
                const allTabs = container.querySelectorAll("[data-tab]");
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => t.classList.remove("_active"));
                currentTab.classList.add("_active");
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    function tabsCatalog() {
        const catalog = document.querySelector("#catalog");
        if (catalog) {
            const buttons = catalog.querySelectorAll("[data-tab-catalog]");
            const tabs = catalog.querySelectorAll("[data-tab-catalog-content]");
            buttons.forEach(btn => {
                btn.addEventListener("mouseover", () => {
                    if (btn.classList.contains("_active")) return;
                    const id = btn.dataset.tabCatalog;
                    const currentTab = catalog.querySelector(`[data-tab-catalog-content="${id}"]`);
                    tabs.forEach(t => t.classList.remove("_active"));
                    buttons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                    currentTab.classList.add("_active");
                    currentTab.style.opacity = "0";
                    setTimeout(() => currentTab.style.opacity = "1", 50);
                });
            });
        }
    }
    function toggleText() {
        const buttons = document.querySelectorAll(".toggle-text-btn");
        if (buttons.length) buttons.forEach(btn => {
            const textBtn = btn.textContent;
            btn.addEventListener("click", () => {
                const toggleText = btn.previousElementSibling;
                if (toggleText.classList.contains("_open")) {
                    toggleText.classList.remove("_open");
                    btn.textContent = textBtn;
                } else {
                    toggleText.classList.add("_open");
                    btn.textContent = "Скрыть";
                }
            });
        });
    }
    function cartPay() {
        const inputsDelivery = document.querySelectorAll(".s-cart input[name='delivery']");
        if (inputsDelivery.length) {
            const inputPayReceipt = document.querySelector("#pay-receipt");
            const inputAddress = document.querySelector("#buyer-address");
            const labelAddress = document.querySelector("label[for='buyer-address']");
            inputsDelivery.forEach(input => {
                input.addEventListener("change", () => {
                    if (input.id === "pickup-store") {
                        inputPayReceipt.disabled = false;
                        inputAddress.classList.add("d-none");
                        labelAddress.classList.add("d-none");
                    } else {
                        inputPayReceipt.disabled = true;
                        inputPayReceipt.checked = false;
                        inputAddress.classList.remove("d-none");
                        labelAddress.classList.remove("d-none");
                    }
                });
            });
        }
        const inputsPay = document.querySelectorAll(".s-cart input[name='pay']");
        if (inputsPay.length) {
            const payCards = document.querySelector("#pay-cards");
            const companyControl = document.querySelector("#company-control");
            const companyDescr = document.querySelector("#company-descr");
            inputsPay.forEach(input => {
                input.addEventListener("change", () => {
                    if (input.id === "pay-online") {
                        payCards.classList.add("d-flex");
                        payCards.classList.remove("d-none");
                    } else {
                        payCards.classList.remove("d-flex");
                        payCards.classList.add("d-none");
                    }
                    if (input.id === "pay-invoice") {
                        companyControl.classList.add("d-block");
                        companyControl.classList.remove("d-none");
                        companyDescr.classList.add("d-block");
                        companyDescr.classList.remove("d-none");
                    } else {
                        companyControl.classList.remove("d-block");
                        companyControl.classList.add("d-none");
                        companyDescr.classList.remove("d-block");
                        companyDescr.classList.add("d-none");
                    }
                });
            });
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
        inputs.forEach(input => {
            input.addEventListener("keydown", e => {
                const value = e.target.value;
                value.split("");
                if (value.length === 0 && (e.key === "8" || e.key === "7")) e.preventDefault();
            });
        });
    }
    function map() {
        const contactsMap = document.querySelector("#map");
        if (contactsMap) {
            const centerArr = JSON.parse(contactsMap.dataset.centers);
            const zoom = Number(contactsMap.dataset.zoom);
            function init() {
                const htmlMap = new ymaps.Map(contactsMap, {
                    center: centerArr[0],
                    zoom
                });
                centerArr.forEach(center => {
                    const placemark = new ymaps.Placemark(center, {}, {});
                    htmlMap.geoObjects.add(placemark);
                });
                htmlMap.controls.remove("geolocationControl");
                htmlMap.controls.remove("searchControl");
                htmlMap.controls.remove("trafficControl");
                htmlMap.controls.remove("typeSelector");
                htmlMap.controls.remove("fullscreenControl");
                htmlMap.controls.remove("zoomControl");
                htmlMap.controls.remove("rulerControl");
            }
            ymaps.ready(init);
        }
        const officeMap = document.querySelector("#office-map");
        if (officeMap) {
            const center = JSON.parse(officeMap.dataset.center);
            const zoom = Number(officeMap.dataset.zoom);
            function init() {
                const htmlMap = new ymaps.Map(officeMap, {
                    center,
                    zoom
                });
                const placemark = new ymaps.Placemark(center, {}, {});
                htmlMap.geoObjects.add(placemark);
                htmlMap.controls.remove("geolocationControl");
                htmlMap.controls.remove("searchControl");
                htmlMap.controls.remove("trafficControl");
                htmlMap.controls.remove("typeSelector");
                htmlMap.controls.remove("fullscreenControl");
                htmlMap.controls.remove("zoomControl");
                htmlMap.controls.remove("rulerControl");
                htmlMap.behaviors.disable([ "scrollZoom" ]);
            }
            ymaps.ready(init);
        }
    }
    function spollersSimple() {
        const buttons = document.querySelectorAll("[data-spoller-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                btn.classList.toggle("_active");
            });
        });
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function passwordsInputs() {
        const buttons = document.querySelectorAll(".password-btn");
        if (buttons.length) buttons.forEach(btn => {
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
    function formSearch() {
        const forms = document.querySelectorAll(".form-search");
        if (forms.length) forms.forEach(form => {
            const input = form.querySelector("input");
            const clear = form.querySelector(".form-search__clear");
            input.addEventListener("input", e => {
                if (e.target.value) form.classList.add("_search"); else form.classList.remove("_search");
            });
            clear.addEventListener("click", () => {
                input.value = "";
                form.classList.remove("_search");
            });
        });
    }
    function profileOrganization() {
        const container = document.querySelector("#organization-container");
        if (container) {
            const btnAdd = document.querySelector("#btn-organization-add");
            btnAdd.addEventListener("click", addOrganization);
            const removeButtons = document.querySelectorAll(".s-profile__organization-del");
            if (removeButtons.length) removeButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const wrapper = btn.closest(".s-profile__form-wrapper");
                    wrapper.remove();
                });
            });
            function addOrganization() {
                const id = Date.now();
                const html = `\n            <div class="s-profile__organization-del">\n              <svg>\n                <use xlink:href="img/icons/icons.svg#icon-trash"></use>\n              </svg>\n            </div>\n            <form action="#" class="s-profile__form-organization">\n              <div class="input-control">\n                <label for="organization-name-${id}" class="label-input">\n                  Название организации\n                </label>\n                <input\n                  type="text"\n                  id="organization-name-2"\n                  class="input"\n                />\n              </div>\n              <div class="input-control">\n                <label for="organization-requizites-${id}" class="label-input">\n                  Реквизиты организации\n                </label>\n                <textarea rows="3" id="organization-requizites-${id}" class="input"></textarea\n                >\n              </div>\n            </form>\n      `;
                const wrapper = document.createElement("div");
                wrapper.classList.add("s-profile__form-wrapper");
                wrapper.setAttribute("id", `organization-${id}`);
                wrapper.innerHTML = html;
                container.insertBefore(wrapper, btnAdd);
                const addedWrapper = container.querySelector(`#organization-${id}`);
                const btnDel = addedWrapper.querySelector(".s-profile__organization-del");
                btnDel.addEventListener("click", () => addedWrapper.remove());
            }
        }
    }
    function filtersSearch() {
        const form = document.querySelector(".filters .form-search");
        if (form) {
            const input = form.querySelector(".input");
            const filters = form.nextElementSibling.querySelectorAll(".label-check");
            const formClear = form.querySelector(".form-search__clear");
            formClear.addEventListener("click", () => {
                filters.forEach(f => f.style.display = "flex");
            });
            input.addEventListener("input", e => {
                const value = e.target.value.toLowerCase();
                filters.forEach(filter => {
                    if (filter.textContent.toLocaleLowerCase().includes(value)) filter.style.display = "flex"; else filter.style.display = "none";
                });
            });
        }
    }
    catalogChange();
    sliders();
    tabsCatalog();
    headerScroll();
    scrollables();
    tabs();
    reviewsOpen();
    filters();
    dropdown();
    productCounter();
    toggleText();
    mediaAdaptive();
    productMoreTabs();
    cartPay();
    inputmask();
    map();
    spollersSimple();
    spoller();
    passwordsInputs();
    formSearch();
    profileOrganization();
    filtersSearch();
    Fancybox.bind("[data-fancybox]", {});
})();