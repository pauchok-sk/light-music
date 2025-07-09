import "../scss/style.scss";
import catalogChange from "./files/catalogChange.js";
import dropdown from "./files/dropdown.js";
import filters from "./files/filters.js";
import headerScroll from "./files/headerScroll.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
import productCounter from "./files/productCounter.js";
import productMoreTabs from "./files/productMoreTabs.js";
import reviewsOpen from "./files/reviewsOpen.js";
import scrollables from "./files/scrollables.js";
import sliders from "./files/sliders.js";
import tabs from "./files/tabs.js";
import tabsCatalog from "./files/tabsCatalog.js";
import toggleText from "./files/toggleText.js";
import cartPay from "./files/cartPay.js";
import inputmask from "./files/inputmask.js";

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

// document.addEventListener('DOMContentLoaded', function() {
//     var myModal = new bootstrap.Modal(document.getElementById('brands-modal'));
//     myModal.show();
// });
