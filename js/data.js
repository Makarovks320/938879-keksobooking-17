'use strict';
(function () {

  var ads = [];

  var priceList = {
    any: [0, Infinity],
    low: [0, 10000],
    middle: [10000, 50000],
    high: [50000, Infinity]
  };
  function comparePrice(adPrice, filterPrice) {
    if (
      (adPrice >= priceList[filterPrice][1] || adPrice < priceList[filterPrice][0])
      && filterPrice !== 'any'
    ) {
      return false;
    }
    return true;
  }
  var mapSelectToData = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };

  function getfilteredBySelectAds(filters) {
    var filteredBySelectAds = ads.filter(function (ad) {
      for (var key in mapSelectToData) {

        if (key === 'housing-price') {
          if (!comparePrice(ad.offer[mapSelectToData[key]], filters[key])) {
            return false;
          } else {
            continue;
          }
        } else {
          if (String(ad.offer[mapSelectToData[key]]) !== filters[key] && filters[key] !== 'any') {
            return false;
          }
        }
      }
      return true;
    }
    );
    return filteredBySelectAds;
  }

  function getActiveInputs(filters) {
    var activeInputs = [];
    for (var key in filters) {
      if (filters[key] === true) {
        activeInputs.splice(0, 0, key);
      }
    }
    return activeInputs;
  }

  function checkIntersection(array1, array2) {
    var result = true;
    array2.forEach(function (item) {
      if (array1.indexOf(item) === -1) {
        result = false;
      }
    });
    return result;
  }

  function getfilteredByInputAds(filters, filteredBySelectAds) {
    var activeInputs = getActiveInputs(filters);
    var filteredByInputAds = filteredBySelectAds.filter(function (ad) {
      return checkIntersection(ad.offer.features, activeInputs);
    }
    );
    return filteredByInputAds;
  }

  function getAds(filters) {
    var filteredBySelectAds = getfilteredBySelectAds(filters);
    var filteredByInputAds = getfilteredByInputAds(filters, filteredBySelectAds);
    var newAds = filteredByInputAds;
    return newAds.slice(0, 5);
  }

  function setAds(newAds) {
    ads = newAds;
  }
  window.data = {
    getAds: getAds,
    setAds: setAds,
    adsLength: 0
  };

})();
