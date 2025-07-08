export default function productMoreTabs() {
  $("#product-descr-more").click(function () {
    const text = $("#product-descr");

    // Меняем текст кнопки
    if (text.hasClass("_open")) {
      text.removeClass("_open");
      $(this).text("Читать далее");
      text.slideUp(300);
      text.slideDown(0);
    } else {
      $(this).text("Скрыть");
      text.addClass("_open");
      text.slideUp(0);
      text.slideDown(300);
    }
  });

  if (window.matchMedia("(max-width: 767px)").matches) {
    const items = $("#product-specifications-more").prevAll();

    items.slice(0, items.length - 6).slideUp(0);

    $("#product-specifications-more").addClass("_active");

    $("#product-specifications-more").click(function () {
      if (!$("#product-specifications-more").hasClass("_active")) {
        $(this).text("Читать далее");
        items.slice(0, items.length - 6).slideUp(300);
        $("#product-specifications-more").addClass("_active");
      } else {
        $(this).text("Скрыть");
        items.slice(0, items.length - 6).slideDown(300);
        $("#product-specifications-more").removeClass("_active");
      }
    });
  }
}
