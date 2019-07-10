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
var mapPinMain = document.querySelector('.map__pin--main');
var addressInputNode = document.querySelector('#address');
var housingTypeNode = document.querySelector('#type');
var priceNode = document.querySelector('#price');
var timeInNode = document.querySelector('#timein');
var timeOutNode = document.querySelector('#timeout');
var roomCountNode = document.querySelector('#room_number');
var capacityNode = document.querySelector('#capacity');

deactivatePage();
fillAddress(mapPinMain);
var adverts = getRandomAdvert(8);

// var areaRect = mapNode.getBoundingClientRect(); // можно заменить просто на offsetWidth в переменной boundSize
// var boundSize = {
//   width: areaRect.width,
//   height: areaRect.height
// };
// var pinSize = {
//   width: mapPinMain.offsetWidth,
//   height: mapPinMain.offsetHeight
// };
// var pinCoords = {
//   x: boundSize.width / 2,
//   y: boundSize.height / 2
// };

// function movePoint(newCoords) {
//   mapPinMain.style.top = newCoords.y - pinSize.height + 'px';
//   mapPinMain.style.left = newCoords.x - pinSize.width / 2 + 'px';
//   setAdress(newCoords);
// }
// function setAdress(coords) {
//   addressInputNode.value = coords.x + ', ' + coords.y;
// }
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  activatePage();
  mapPinMain.style.zIndex = 10;


  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if (moveEvt.clientY > Y_TOP_MAP_BORDER && moveEvt.clientY < Y_BOTTOM_MAP_BORDER) {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }
    if (moveEvt.clientX > mapNode.offsetLeft && moveEvt.clientX < mapNode.offsetLeft + mapNode.clientWidth) {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    listNode.appendChild(fillDocumentFragment(adverts));
    fillAddress(mapPinMain);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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

roomCountNode.addEventListener('change', function () {
  enableSelecting(capacityNode);
  synchronizeCapacity(capacityNode);
});


function synchronizeCapacity(localCapacityNode) {
  var i;
  if (event.target.value === '100') {
    for (i = 0; i < localCapacityNode.children.length - 1; i++) {
      localCapacityNode.children[i].disabled = true;
    }
    localCapacityNode.value = '0';
  } else {
    localCapacityNode.lastElementChild.disabled = true;
    for (i = localCapacityNode.children.length - 2 - event.target.value; i >= 0; i--) {
      localCapacityNode.children[i].disabled = true;
    }
    localCapacityNode.value = event.target.value;
  }
}

function enableSelecting(localSelectingNode) {
  for (var i = 0; i < localSelectingNode.children.length; i++) {
    localSelectingNode.children[i].disabled = false;
  }
}

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
  var coordinateX = parseInt(mark.style.left, 10) + 25;
  var coordinateY = parseInt(mark.style.top, 10) + 80;
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
