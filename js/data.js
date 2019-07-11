'use strict';
// создает массив объектов-объявлений
(function () {
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var listNode = document.querySelector('.map__pins');
  var mapBorders = {
    X_RIGHT: listNode.offsetWidth - 50,
    X_LEFT: 0,
    Y_BOTTOM: 630,
    Y_TOP: 130
  };
  var adverts = getRandomAdvert(8);

  window.data = {
    mapBorders: {
      X_RIGHT: listNode.offsetWidth - 50,
      X_LEFT: 0,
      Y_BOTTOM: 630,
      Y_TOP: 130
    },
    listNode: listNode,
    adverts: adverts
  };

  function getRandomInteger(max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.round(Math.random() * (max - min) + min);
  }

  function getRandomAdvert(count) {
    var localAdverts = [];
    for (var i = 0; i < count; i++) {
      var localAdvert = {};
      localAdvert.author = {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      };
      localAdvert.offer = {
        type: TYPES[getRandomInteger(8)]
      };
      localAdvert.location = {
        x: getRandomInteger(mapBorders.X_RIGHT, mapBorders.X_LEFT),
        y: getRandomInteger(mapBorders.Y_TOP, mapBorders.Y_BOTTOM)
      };
      localAdverts[i] = localAdvert;
    }
    return localAdverts;
  }
})();
