import "../scss/style.scss";
import catalogChange from "./files/catalogChange.js";
import dropdown from "./files/dropdown.js";
import filters from "./files/filters.js";
import headerScroll from "./files/headerScroll.js";
import productCounter from "./files/productCounter.js";
import reviewsOpen from "./files/reviewsOpen.js";
import scrollables from "./files/scrollables.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";
import tabsCatalog from "./files/tabsCatalog.js";
import toggleText from "./files/toggleText.js";

spoller();
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

Fancybox.bind("[data-fancybox]", {});

// document.addEventListener('DOMContentLoaded', function() {
//     var myModal = new bootstrap.Modal(document.getElementById('brands-modal'));
//     myModal.show();
// });
