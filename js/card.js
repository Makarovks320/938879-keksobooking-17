'use strict';

//  модуль, который отвечает за создание карточек объявлений

(function () {

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
  window.card = {
    fragment: fillDocumentFragment(window.data.adverts)
  };
})();
