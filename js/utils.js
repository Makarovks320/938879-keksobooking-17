'use strict';
(function () {
  window.utils = function () {
    var template = document.querySelector('#error');
    var node = template.content.querySelector('div').cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', node);
  };

})();
