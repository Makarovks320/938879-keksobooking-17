'use strict';

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var template = document.querySelector('#pin');
var listNode = document.querySelector('.map__pins');

var X_RIGHT_MAP_BORDER = listNode.offsetWidth - 50;
var X_LEFT_MAP_BORDER = 0;
var Y_BOTTOM_MAP_BORDER = 630;
var Y_TOP_MAP_BORDER = 130;

var adverts = getRandomAdvert(8);

document.querySelector('.map').classList.remove('map--faded');

listNode.appendChild(fillDocumentFragment(adverts));

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
      x: getRandomInteger(X_RIGHT_MAP_BORDER, X_LEFT_MAP_BORDER),
      y: getRandomInteger(Y_TOP_MAP_BORDER, Y_BOTTOM_MAP_BORDER)
    };
    localAdverts[i] = localAdvert;
  }
  return localAdverts;
}

function createAdvertElement(advert) {
  var advertElement = template.content.querySelector('.map__pin').cloneNode(true);
  advertElement.style.left = advert.location.x + 'px';
  advertElement.style.top = advert.location.y + 'px';
  advertElement.querySelector('img').src = advert.author.avatar;
  advertElement.querySelector('img').alt = 'заголовок объявления';
  return advertElement;
}


function fillDocumentFragment(localAdverts) {
  var fragment = document.createDocumentFragment();
  localAdverts.forEach(function (advertItem) {
    fragment.appendChild(createAdvertElement(advertItem));
  });
  return fragment;
}
