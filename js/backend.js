'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    send: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 10000;

  function makeXhr(onSuccess, onError) {
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

    xhr.timeout = TIMEOUT;
    return xhr;
  }
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = makeXhr(onSuccess, onError);
      xhr.open('GET', URL.load);
      xhr.send();
    },
    send: function (data, onSuccess, onError) {
      var xhr = makeXhr(onSuccess, onError);
      xhr.open('POST', URL.send);
      xhr.send(data);
    }
  };
})();
