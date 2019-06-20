'use strict';

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var template = document.querySelector('#pin');
var listNode = document.querySelector('.map__pins');
var adverts = getRandomAdvert(8);

document.querySelector('.map').classList.remove('map--faded');

displayAdverts(adverts);

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
      x: getRandomInteger(130, 630),
      y: getRandomInteger(130, 630)
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

function displayAdverts(localAdverts) {
  localAdverts.forEach(function (advertItem) {
    listNode.appendChild(createAdvertElement(advertItem));
  });
}
