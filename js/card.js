'use strict';
(function () {

  var template = document.querySelector('#card');
  var mapNode = document.querySelector('.map');
  var ESC_KEYCODE = 27;

  var mapAdToCard = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  function setPopupActivity(advert) {
    removeCard();
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
    cardClose.addEventListener('click', closePopup);
  }

  function closePopup() {
    mapNode.removeChild(mapNode.querySelector('article'));
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function createCard(advert) {
    var ad = advert;
    var cardElement = template.content.querySelector('article').cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = mapAdToCard[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    updateFeatures(ad.offer.features, cardElement);
    updatePhotos(ad.offer.photos, cardElement);

    return cardElement;
  }

  function updateFeatures(features, card) {
    var featuresListNode = card.querySelector('.popup__features');
    featuresListNode.innerHTML = '';
    features.forEach(function (feature) {
      var featureNode = document.createElement('li');
      featureNode.className = 'popup__feature popup__feature--' + feature;
      featuresListNode.appendChild(featureNode);
    });
  }

  function updatePhotos(photos, card) {
    var photoContainer = card.querySelector('.popup__photos');
    photoContainer.innerHTML = '';
    photos.forEach(function (photo) {
      var photoNode = document.createElement('img');
      photoNode.src = photo;
      photoNode.class = 'popup__photo';
      photoNode.width = '45';
      photoNode.height = '40';
      photoNode.alt = 'Фотография жилья';
      photoContainer.appendChild(photoNode);
    });

  }

  function removeCard() {
    if (mapNode.querySelector('article') !== null) {
      closePopup();
    }
  }
  window.card = {
    setPopupActivity: setPopupActivity,
    removeCard: removeCard
  };
})();
