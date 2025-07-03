import Scrollable from "./Scrollable.js";

export default function scrollables() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    new Scrollable(".s-history__nav");
  }
}