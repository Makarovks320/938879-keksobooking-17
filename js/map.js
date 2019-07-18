'use strict';

//  модуль, который отрисовывает карточки на карте
// активирует карту и страницу
(function () {
  var mapNode = document.querySelector('.map');
  var listNode = document.querySelector('.map__pins');
  var adFormNode = document.querySelector('.ad-form');
  var mapFiltersNode = document.querySelector('.map__filters');

  window.map = {
    deactivatePage: function () {
      mapNode.classList.add('map--faded');
      window.form.disableForm(adFormNode);
      window.form.disableForm(mapFiltersNode);
    },

    activatePage: function () {
      mapNode.classList.remove('map--faded');
      window.form.enableForm(adFormNode);
      window.form.enableForm(mapFiltersNode);
    },

    activatePins: function () {
      listNode.appendChild(window.data.fragment);
    },
    mapBorders: {
      X_RIGHT: listNode.offsetWidth - 50,
      X_LEFT: 0,
      Y_BOTTOM: 630,
      Y_TOP: 130
    },
    mapNode: mapNode,
    listNode: listNode

  };

})();
