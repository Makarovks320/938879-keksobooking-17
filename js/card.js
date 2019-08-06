'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var template = document.querySelector('#card');
  var mapNode = document.querySelector('.map');

  var mapAdToCard = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  function setPopupActivity(advert) {
    removePopup();
    var card = createCard(advert);
    openPopup(card);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  function openPopup(cardNode) {
    mapNode.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', cardNode);
    document.addEventListener('keydown', onPopupEscPress);
    var cardClose = mapNode.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closePopup();
    });
  }

  function closePopup() {
    mapNode.removeChild(mapNode.querySelector('article'));
    mapNode.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function createCard(advert) {
    var ad = advert;
    var card = template.content.querySelector('article').cloneNode(true);

    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = mapAdToCard[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    updateFeatures(ad.offer.features, card);
    updatePhotos(ad.offer.photos, card);

    return card;
  }

  function updateFeatures(features, card) {
    var featuresListNode = card.querySelector('.popup__features');
    featuresListNode.innerHTML = '';
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var featureNode = document.createElement('li');
      featureNode.className = 'popup__feature popup__feature--' + feature;
      fragment.appendChild(featureNode);
    });
    featuresListNode.appendChild(fragment);
  }

  function updatePhotos(photos, card) {
    var photoContainer = card.querySelector('.popup__photos');
    photoContainer.innerHTML = '';
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var photoNode = document.createElement('img');
      photoNode.src = photo;
      photoNode.class = 'popup__photo';
      photoNode.width = '45';
      photoNode.height = '40';
      photoNode.alt = 'Фотография жилья';
      fragment.appendChild(photoNode);
    });
    photoContainer.appendChild(fragment);
  }

  function removePopup() {
    if (mapNode.querySelector('article') !== null) {
      closePopup();
    }
  }
  window.card = {
    setPopupActivity: setPopupActivity,
    removePopup: removePopup
  };
})();
