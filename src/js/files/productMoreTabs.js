export default function productMoreTabs() {
  const productDescrBtn = document.querySelector("#product-descr-more");

  if (productDescrBtn) {
    const text = document.querySelector("#product-descr");
    const textBtn = productDescrBtn.textContent;

    productDescrBtn.addEventListener("click", () => {
      if (text.classList.contains("_open")) {
        hide();
      } else {
        open();
      }
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
      if (specifications.classList.contains("_open")) {
        hide();
      } else {
        open();
      }
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
