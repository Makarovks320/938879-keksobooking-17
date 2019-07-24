'use strict';
(function () {

  var ads = [];

  function getAds() {
    return ads.slice(0, 5);
  }

  function setAds(newAds) {
    ads = newAds;
  }

  function filterAds(filters) {
    var priceList = {
      any: [0, Infinity],
      low: [0, 10000],
      middle: [10000, 50000],
      high: [50000, Infinity]
    };
    var newAds = ads.filter(function (ad) {
      if ((ad.offer.type !== filters['housing-type']) && (filters['housing-type'] !== 'any')) {
        return false;
      }
      if (
        ((ad.offer.price >= priceList[filters['housing-price']][1])
      || (ad.offer.price < priceList[filters['housing-price']][0]))
      &&
      (filters['housing-price'] !== 'any')
      ) {
        return false;
      }
      if ((ad.offer.guests !== +filters['housing-guests']) && (filters['housing-guests'] !== 'any')) {
        return false;
      }
      if ((ad.offer.rooms !== +filters['housing-rooms']) && (filters['housing-rooms'] !== 'any')) {
        return false;
      }
      return true;
    });
    // console.log(newAds);
    // console.log(ads);
    // console.log(filters);
    return newAds;
  }
  window.data = {
    getAds: getAds,
    setAds: setAds,
    filterAds: filterAds
  };

})();
