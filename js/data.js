'use strict';
(function () {

  var ads = [];

  function getAds() {
  // function getAds(filters){
  //  var newAds = ads.filter...
    return ads;
  // return ads.slice(0, 5);
  }

  function setAds(newAds) {
    ads = newAds;
  }

  window.data = {
    getAds: getAds,
    setAds: setAds
  };

})();
