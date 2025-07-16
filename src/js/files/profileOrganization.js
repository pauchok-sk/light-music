export default function profileOrganization() {
  const container = document.querySelector("#organization-container");

  if (container) {
    const btnAdd = document.querySelector("#btn-organization-add");
    btnAdd.addEventListener("click", addOrganization);

    const removeButtons = document.querySelectorAll(
      ".s-profile__organization-del"
    );

    if (removeButtons.length) {
      removeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const wrapper = btn.closest(".s-profile__form-wrapper");

          wrapper.remove();
        });
      });
    }

    function addOrganization() {
      const id = Date.now();

      const html = `
            <div class="s-profile__organization-del">
              <svg>
                <use xlink:href="img/icons/icons.svg#icon-trash"></use>
              </svg>
            </div>
            <form action="#" class="s-profile__form-organization">
              <div class="input-control">
                <label for="organization-name-${id}" class="label-input">
                  Название организации
                </label>
                <input
                  type="text"
                  id="organization-name-2"
                  class="input"
                />
              </div>
              <div class="input-control">
                <label for="organization-requizites-${id}" class="label-input">
                  Реквизиты организации
                </label>
                <textarea rows="3" id="organization-requizites-${id}" class="input"></textarea
                >
              </div>
            </form>
      `;

      const wrapper = document.createElement("div");

      wrapper.classList.add("s-profile__form-wrapper");
      wrapper.setAttribute("id", `organization-${id}`);
      wrapper.innerHTML = html;

      container.insertBefore(wrapper, btnAdd);

      const addedWrapper = container.querySelector(`#organization-${id}`);
      const btnDel = addedWrapper.querySelector(".s-profile__organization-del");

      btnDel.addEventListener("click", () => addedWrapper.remove());
    }
  }
}
