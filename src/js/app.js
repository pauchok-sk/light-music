import "../scss/style.scss";
import catalogChange from "./files/catalogChange.js";
import headerScroll from "./files/headerScroll.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabsCatalog from "./files/tabsCatalog.js";

spoller();
catalogChange();
sliders();
tabsCatalog();
headerScroll();

// document.addEventListener('DOMContentLoaded', function() {
//     var myModal = new bootstrap.Modal(document.getElementById('call-modal'));
//     myModal.show();
// });