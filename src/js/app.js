import "../scss/style.scss";
import catalogChange from "./files/catalogChange.js";
import headerScroll from "./files/headerScroll.js";
import scrollables from "./files/scrollables.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";
import tabsCatalog from "./files/tabsCatalog.js";

spoller();
catalogChange();
sliders();
tabsCatalog();
headerScroll();
scrollables();
tabs();

Fancybox.bind("[data-fancybox]", {});

// document.addEventListener('DOMContentLoaded', function() {
//     var myModal = new bootstrap.Modal(document.getElementById('call-modal'));
//     myModal.show();
// });
