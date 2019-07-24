'use strict';

//  модуль, который отрисовывает карточки на карте
// активирует карту и страницу
(function () {
  var mapNode = document.querySelector('.map');
  var listNode = document.querySelector('.map__pins');
  var template = document.querySelector('#pin');


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

  var pinsActivated = false;

  function updatePins(filters) {
    var filteredAds = window.data.getAds(filters);
    var fragment = fillDocumentFragment(window.data.getAds(filters));
    if (pinsActivated === true) {
      for (var i = 0; i < window.data.adsLength; i++) {
        listNode.removeChild(listNode.lastChild);
      }
    } else {
      pinsActivated = true;
    }
    listNode.appendChild(fragment);
    window.data.adsLength = filteredAds.length;
  }
  // function updatePins(filters) {
  //   var fragment = fillDocumentFragment(window.data.getAds(filters));
  //   console.log(listNode.children.length);
  //   if (pinsActivated === true) {
  //     console.log('пины активированы');
  //     for (var i = listNode.children.length - 1; i >= 0; i++) {
  //       console.log(listNode.children);
  //       console.log(listNode.children[i]);
  //       console.log(listNode.children[i].class);
  //       // if (listNode.children[i].class === 'map__pin') {
  //       //   listNode.removeChild(listNode.children[i]);
  //       // }
  //     }
  //   } else {
  //     console.log('пины не активированы');
  //     pinsActivated = true;
  //   }
  //   listNode.appendChild(fragment);
  // }
  function deactivatePage() {
    mapNode.classList.add('map--faded');
    window.form.disableForm();
  }
  function activatePage() {
    mapNode.classList.remove('map--faded');
    window.form.enableForm();
  }
  function activatePins() {
    var successCallback = function (ads) {
      window.data.setAds(ads);
      updatePins(window.form.activeFilters);
    };
    window.load.getData(successCallback, window.utils.displayError);
  }
  window.map = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    activatePins: activatePins,
    updatePins: updatePins,
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
