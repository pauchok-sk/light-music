export default function productCounter() {
  const inputControls = document.querySelectorAll(".input-control-counter");

  if (inputControls.length) {
    inputControls.forEach((control) => {
      const btnMinus = control.querySelector(".input-counter._minus");
      const btnPlus = control.querySelector(".input-counter._plus");
      const input = control.querySelector("input");

      btnPlus.addEventListener("click", changePlus);
      btnMinus.addEventListener("click", changeMinus);

      input.addEventListener("input", changeInput);

      function changePlus() {
        input.value = +input.value + 1;

        if (+input.value > 1) {
          btnMinus.classList.remove("_disable");
        }
      }
      function changeMinus() {
        input.value = +input.value - 1;

        if (+input.value === 1) {
          btnMinus.classList.add("_disable");
        }
      }
      function changeInput() {
        if (+input.value <= 1) {
          btnMinus.classList.add("_disable");
        } else {
          btnMinus.classList.remove("_disable");
        }
      }
    });
  }
}