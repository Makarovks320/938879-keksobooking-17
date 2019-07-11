'use strict';

//  модуль, который отрисовывает карточки на карте
// активирует карту и страницу
(function () {
  var mapNode = document.querySelector('.map');
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
      window.data.listNode.appendChild(window.card.fragment);
    },

    mapNode: mapNode

  };

})();
