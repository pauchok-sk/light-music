export default function toggleText() {
  $(".toggle-text").each(function (index, element) {
    $(this).prevAll("p").not(':last').slideUp(0);

    $(this).click(function() {
      if (!$(this).hasClass("_active")) {
        $(this).prevAll("p").slideDown(300)
        $(this).addClass("_active");
        $(this).text("Скрыть");
      } else {
        $(this).prevAll("p").not(':first').slideUp(300)
        $(this).removeClass("_active");
        $(this).text("Подробнее");
      }
    })
  });

  $(".toggle-text-btn").click(function () {
    // Затем показываем только предыдущий
    $(this).prev(".toggle-text").slideToggle(300);
    // Убираем активные классы у всех кнопок
    $(".toggle-text-btn").removeClass("_active");
    // Добавляем класс только текущей кнопке
    $(this).toggleClass("_active");
  });
}
