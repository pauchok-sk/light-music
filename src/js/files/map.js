export default function map() {
  const contactsMap = document.querySelector("#map");

  if (contactsMap) {
    const centerArr = JSON.parse(contactsMap.dataset.centers);
    const zoom = Number(contactsMap.dataset.zoom);

    function init() {
      const htmlMap = new ymaps.Map(contactsMap, {
        center: centerArr[0],
        zoom,
      });

      centerArr.forEach((center) => {
        const placemark = new ymaps.Placemark(
          center,
          {},
          {}
        );
        
        htmlMap.geoObjects.add(placemark);
      });

      htmlMap.controls.remove("geolocationControl"); // удаляем геолокацию
      htmlMap.controls.remove("searchControl"); // удаляем поиск
      htmlMap.controls.remove("trafficControl"); // удаляем контроль трафика
      htmlMap.controls.remove("typeSelector"); // удаляем тип
      htmlMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
      htmlMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
      htmlMap.controls.remove("rulerControl"); // удаляем контрол правил
      // htmlMap.behaviors.disable(["scrollZoom"]);
    }

    ymaps.ready(init);
  }
}