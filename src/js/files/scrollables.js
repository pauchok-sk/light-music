import Scrollable from "./Scrollable.js";

export default function scrollables() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    new Scrollable(".s-history__nav");
  }

  new Scrollable(".s-archive-reviews__nav");
}