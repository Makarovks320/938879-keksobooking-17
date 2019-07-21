'use strict';

(function () {
  var mapBorders = window.map.mapBorders;
  var arrowHeight = 15; // длина стрелки у пина
  var mapPinMain = document.querySelector('.map__pin--main');

  window.map.deactivatePage();
  window.form.fillAddress(mapPinMain);

  var areaRect = window.map.mapNode.getBoundingClientRect();
  var areaPinMain = mapPinMain.getBoundingClientRect();
  var boundSize = {
    width: areaRect.width,
    height: areaRect.height
  };
  var pinSize = {
    width: areaPinMain.width,
    height: areaPinMain.height + arrowHeight
  };
  var pinCoords = {
    x: boundSize.width / 2,
    y: areaPinMain.top + window.scrollY + pinSize.height
  };

  var activated = false;

  function movePoint(newCoords) {
    mapPinMain.style.top = newCoords.y - pinSize.height + 'px';
    mapPinMain.style.left = newCoords.x - pinSize.width / 2 + 'px';
  }

  function validateBound(coords, bound) {
    var newCoords = {
      x: coords.x,
      y: coords.y
    };
    if (newCoords.x > bound.width) {
      newCoords.x = bound.width;
    }

    if (newCoords.x < 0) {
      newCoords.x = 0;
    }

    if (newCoords.y > mapBorders.Y_BOTTOM) {
      newCoords.y = mapBorders.Y_BOTTOM;
    }

    if (newCoords.y < mapBorders.Y_TOP) {
      newCoords.y = mapBorders.Y_TOP;
    }

    return newCoords;
  }


  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.activatePage();
    mapPinMain.style.zIndex = 10;


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: pinCoords.x - shift.x,
        y: pinCoords.y - shift.y,
      };

      pinCoords = validateBound(newCoords, boundSize);

      movePoint(pinCoords);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.fillAddress(mapPinMain);
      if (!activated) {
        window.map.activatePins();
        window.form.fillAddress(mapPinMain);
        activated = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
