'use strict';

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

document.querySelector('.map').classList.remove('map--faded');

var template = document.querySelector('#pin');
var listNode = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var adverts = getRandomAdvert(8);
fillDocumentFragment(adverts);
listNode.appendChild(fragment);

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
      x: getRandomInteger(listNode.offsetWidth - 50, 0),
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


function fillDocumentFragment(localAdverts) {
  localAdverts.forEach(function (advertItem) {
    fragment.appendChild(createAdvertElement(advertItem));
  });
}
