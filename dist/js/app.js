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
    }
    function sliders() {
        const headerCategoriesSlider = document.querySelector(".header-categories__slider");
        if (headerCategoriesSlider) {
            new Swiper(headerCategoriesSlider, {
                speed: 700,
                spaceBetween: 5,
                slidesPerView: "auto",
                autoplay: {
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
                    delay: 3500
                },
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
                    delay: 2500
                },
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
                    delay: autoplayDelay || 3e3
                },
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
                    delay: 3500
                },
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
            new Swiper(reviewsSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-reviews .slider-btn._prev",
                    nextEl: ".s-reviews .slider-btn._next"
                },
                autoplay: {
                    delay: 3200
                },
                breakpoints: {
                    1600: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
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
    Fancybox.bind("[data-fancybox]", {});
})();