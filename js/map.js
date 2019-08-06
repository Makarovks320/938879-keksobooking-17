'use strict';

(function () {
  var mapNode = document.querySelector('.map');
  var listNode = document.querySelector('.map__pins');
  var template = document.querySelector('#pin');
  var pinsActivated = false;

  function createAdvertElement(advert) {
    var ad = template.content.querySelector('.map__pin').cloneNode(true);
    ad.style.left = advert.location.x + 'px';
    ad.style.top = advert.location.y + 'px';
    ad.querySelector('img').src = advert.author.avatar;
    ad.querySelector('img').alt = 'заголовок объявления';
    return ad;
  }

  function fillDocumentFragment(localAdverts) {
    var fragment = document.createDocumentFragment();
    localAdverts.forEach(function (advertItem) {
      var pin = createAdvertElement(advertItem);
      pin.addEventListener('click', function () {
        window.card.setPopupActivity(advertItem);
        pin.classList.add('map__pin--active');
      });
      fragment.appendChild(pin);
    });
    return fragment;
  }


  function updatePins(filters) {
    var filteredAds = window.data.getAds(filters);
    var fragment = fillDocumentFragment(filteredAds);
    var pinsNodes = listNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsActivated === true) {
      for (var i = 0; i < pinsNodes.length; i++) {
        listNode.removeChild(pinsNodes[i]);
      }
    } else {
      pinsActivated = true;
    }
    listNode.appendChild(fragment);
  }

  function deactivatePage() {
    mapNode.classList.add('map--faded');
    window.form.disable();
  }
  function activatePage() {
    mapNode.classList.remove('map--faded');
    window.form.enable();
  }
  function activatePins() {
    function successCallback(ads) {
      window.data.setAds(ads);
      updatePins(window.form.activeFilters);
    }
    window.backend.load(successCallback, window.form.errorHandler);
  }

  function clean() {
    window.card.removePopup();
    var pinsNodes = listNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsNodes !== null) {
      for (var i = 0; i < pinsNodes.length; i++) {
        listNode.removeChild(pinsNodes[i]);
      }
    }
  }

  window.map = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    activatePins: activatePins,
    updatePins: updatePins,
    borders: {
      X_RIGHT: listNode.offsetWidth - 50,
      X_LEFT: 0,
      Y_BOTTOM: 630,
      Y_TOP: 130
    },
    node: mapNode,

    clean: clean

  };

})();
