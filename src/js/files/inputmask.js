export default function inputmask() {
  const inputs = document.querySelectorAll('input[type="tel"]');
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(inputs);

  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      const value = e.target.value;
      const arrValue = value.split("");

      if (value.length === 0 && (e.key === "8" || e.key === "7"))
        e.preventDefault();
    });
  });
}
