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

var mapNode = document.querySelector('.map');
var adFormNode = document.querySelector('.ad-form');
var mapFiltersNode = document.querySelector('.map__filters');
var markerNode = document.querySelector('.map__pin--main');
var addressInputNode = document.querySelector('#address');
var housingTypeNode = document.querySelector('#type');
var priceNode = document.querySelector('#price');
var timeInNode = document.querySelector('#timein');
var timeOutNode = document.querySelector('#timeout');

deactivatePage();
fillAddress(markerNode);
var adverts = getRandomAdvert(8);
markerNode.addEventListener('mouseup', function () {
  activatePage();
  listNode.appendChild(fillDocumentFragment(adverts));
  fillAddress(markerNode);
});


housingTypeNode.addEventListener('change', function () {
  updatePrice(priceNode, event);
});

timeInNode.addEventListener('change', function () {
  synchronizeTime(timeOutNode, event);
});

timeOutNode.addEventListener('change', function () {
  synchronizeTime(timeInNode, event);
});


function synchronizeTime(syncNode, evt) {
  syncNode.value = evt.target.value;
}

function updatePrice(localPriceNode, evt) {
  var minPriceList = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  localPriceNode.placeholder = minPriceList[evt.target.value];
  localPriceNode.min = minPriceList[evt.target.value];
}

function disableForm(form) {
  form.classList.add('ad-form--disabled');
  for (var i = 0; i < form.children.length; i++) {
    form.children[i].setAttribute('disabled', '');
  }
}

function enableForm(form) {
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < form.children.length; i++) {
    form.children[i].removeAttribute('disabled');
  }
}

function getCoordinates(mark) {
  var coordinateX = parseInt(mark.style.left, 10);
  var coordinateY = parseInt(mark.style.top, 10);
  var coordinates = [coordinateX, coordinateY];
  return coordinates;
}

function fillAddress(mark) {
  addressInputNode.value = getCoordinates(mark);
}

function deactivatePage() {
  mapNode.classList.add('map--faded');
  disableForm(adFormNode);
  disableForm(mapFiltersNode);
}

function activatePage() {
  mapNode.classList.remove('map--faded');
  enableForm(adFormNode);
  enableForm(mapFiltersNode);
}

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
