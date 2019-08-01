'use strict';
(function () {

  var nodes;
  var ads;
  var template = document.querySelector('#card');
  var mapNode = document.querySelector('.map');
  var ESC_KEYCODE = 27;
  var mapAdToCard = {
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'flat': 'Квартира',
    'palace': 'Дворец'
  };

  function setHandlers(pinsNodes, filteredAds) {
    nodes = pinsNodes;
    ads = filteredAds;

    for (var i = 0; i < nodes.length; i++) {

      nodes[i].currentIndex = i;
      nodes[i].addEventListener('click', onPinClick);
    }
  }
  function onPinClick(evt) {
    var card = createCard(ads, evt.currentTarget.currentIndex);
    openPopup(card);
    // ПЕРЕДЕЛАТЬ НА insertAdjacentHTML
    // mapNode.querySelector('.map__filters-container').insertAdjacentHTML('beforebegin', card);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  function openPopup(cardNode) {
    mapNode.appendChild(cardNode);
    document.addEventListener('keydown', onPopupEscPress);
    var cardClose = mapNode.lastChild.querySelector('.popup__close');
    cardClose.addEventListener('click', closePopup);
  }

  function closePopup() {
    mapNode.removeChild(mapNode.lastChild);
  }

  function createCard(adverts, index) {
    var ad = adverts[index];
    var fragment = document.createDocumentFragment();
    var cardElement = template.content.querySelector('article').cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = mapAdToCard[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;

    updateFeatures(ad, cardElement);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    updatePhotos(ad, cardElement);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    fragment.appendChild(cardElement);
    return fragment;
  }

  function updateFeatures(advert, card) { // исправить

    var featuresListNode = card.querySelector('.popup__features');
    var featuresCollection = card.querySelector('.popup__features').children;
    var missingFeatures = [];

    for (var i = 0; i < featuresCollection.length; i++) {
      var featureName = '';
      for (var j = 31; j < featuresCollection[i].className.length; j++) {
        featureName += featuresCollection[i].className[j];
      }

      if (advert.offer.features.indexOf(featureName) === -1) {
        missingFeatures.splice(0, 0, i);
      }
    }
    console.log(missingFeatures);
    for (var k = missingFeatures.length - 1; k >= 0; k--) {
      featuresListNode.removeChild(featuresCollection[k]);
    }

  }

  function updatePhotos(advert, card) { // исправить
    var photos = [];
    var photo = card.querySelector('.popup__photo').cloneNode();
    var photoContainer = card.querySelector('.popup__photos');

    photoContainer.removeChild(photoContainer.children[0]);

    for (var i = 0; i < advert.offer.photos.length; i++) {
      photos[i] = photo.cloneNode(true);
      photos[i].src = advert.offer.photos[i];
      photoContainer.appendChild(photo);
    }
    // console.log(photos); видно, что в photoContainer есть фотки с правильными src, но они не отображаются
  }

  window.card = {
    setHandlers: setHandlers
  };
})();
