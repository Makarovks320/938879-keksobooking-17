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
    pinsNodes = listNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    /*
  В функции updatePins есть:
    filteredAds - массив отрисованных объявлений;
    pinsNodes - коллекция ДОМ-элементов пинов;
    Если здесь к каждому ДОМ-элементу поставить слушатель на клик,
    то
    */
    window.card.setHandlers(pinsNodes, filteredAds);
    // for (var j = 0; j < pinsNodes.length; j++) {
    //   pinsNodes[j].addEventListener('click', function () {
    //     console.log('вызываюсь');

    //   });
    // }
  }

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
