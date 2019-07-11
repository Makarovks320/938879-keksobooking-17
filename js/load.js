'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };


  var successHandler = function (adverts) {
    window.load = {
      adverts: adverts
    };

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
    window.load = {
      fragment: fillDocumentFragment(window.load.adverts)
    };
  };

  var errorHandler = function () {
    var template = document.querySelector('#error');
    var node = template.content.querySelector('p').cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);


})();

