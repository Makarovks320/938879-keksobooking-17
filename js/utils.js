'use strict';
(function () {
  function displayError() {
    var template = document.querySelector('#error');
    var node = template.content.querySelector('div').cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', node);
  }
  window.utils = {
    displayError: displayError
  };
})();
