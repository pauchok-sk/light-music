export default class Scrollable {
  constructor(selector, options) {
    let defaultOptions = {
      wheelScrolling: true,
    };
    this.container = document.querySelector(selector);
    this.options = Object.assign(defaultOptions, options);

    if (!this.container) {
      return;
    }

    this.childrensSize = Array.from(this.container.children).reduce((sum, item) => sum + item.offsetWidth, 0);

    this.container.classList.add("_scrollable")

    if (this.container.clientWidth < this.childrensSize) {
      this.container.style = "cursor: grab";
    }

    this.isDragging = false;
    this.startX = null;
    this.scrollLeft = null;

    this.events();
  }

  events() {
    if (this.container) {
      this.container.addEventListener("mousedown", (e) => {
        this.isDragging = true;

        this.startX = e.pageX - this.container.offsetLeft;
        this.scrollLeft = this.container.scrollLeft;
      });

      this.container.addEventListener("mouseup", (e) => {
        this.isDragging = false;
      });

      this.container.addEventListener("mousemove", (e) => {
        if (!this.isDragging) return;

        const x = e.pageX - this.container.offsetLeft;
        const walkX = (x - this.startX) * 1;
        this.container.scrollLeft = this.scrollLeft - walkX;
      });

      this.container.addEventListener("mouseleave", (e) => {
        if (this.isDragging) {
          this.isDragging = false;
        }
      });

      if (this.options.wheelScrolling) {
        this.container.addEventListener("mousewheel", (e) => {
          e.preventDefault();
          this.container.scrollLeft += e.deltaY;
        });
      }
    }
  }
}