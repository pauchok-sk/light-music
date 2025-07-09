export default function cartPay() {
  const inputsDelivery = document.querySelectorAll(".s-cart input[name='delivery']");
  
  if (inputsDelivery.length) {
    const inputPayReceipt = document.querySelector("#pay-receipt");
    const inputAddress = document.querySelector("#buyer-address");
    const labelAddress = document.querySelector("label[for='buyer-address']");

    inputsDelivery.forEach((input) => {
      input.addEventListener("change", () => {
        if (input.id === "pickup-store") {
          inputPayReceipt.disabled = false;
          inputAddress.classList.add("d-none");
          labelAddress.classList.add("d-none");
        } else {
          inputPayReceipt.disabled = true;
          inputAddress.classList.remove("d-none");
          labelAddress.classList.remove("d-none");
        }
      });
    });
  }

  const inputsPay = document.querySelectorAll(".s-cart input[name='pay']");
  
  if (inputsPay.length) {
    const payCards = document.querySelector("#pay-cards");

    const companyControl = document.querySelector("#company-control");
    const companyDescr = document.querySelector("#company-descr");

    inputsPay.forEach((input) => {
      input.addEventListener("change", () => {
        if (input.id === "pay-online") {
          payCards.classList.add("d-flex");
          payCards.classList.remove("d-none");
        } else {
          payCards.classList.remove("d-flex");
          payCards.classList.add("d-none");
        }

        if (input.id === "pay-invoice") {
          companyControl.classList.add("d-block");
          companyControl.classList.remove("d-none");

          companyDescr.classList.add("d-block");
          companyDescr.classList.remove("d-none");
        } else {
          companyControl.classList.remove("d-block");
          companyControl.classList.add("d-none");

          companyDescr.classList.remove("d-block");
          companyDescr.classList.add("d-none");
        }
      });
    });
  }
}
