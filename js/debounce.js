'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  // if (lastTimeout) {
  //   window.clearTimeout(lastTimeout);
  // }
  // lastTimeout = window.setTimeout(function () {
  //   updateInputFilters(evt);
  //   window.map.updatePins(activeFilters);
  // }, 500);

  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
