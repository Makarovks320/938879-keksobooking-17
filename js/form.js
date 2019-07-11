'use strict';

//  модуль, который работает с формой объявления

(function () {

  var housingTypeNode = document.querySelector('#type');
  var priceNode = document.querySelector('#price');
  var timeInNode = document.querySelector('#timein');
  var timeOutNode = document.querySelector('#timeout');
  var roomCountNode = document.querySelector('#room_number');
  var capacityNode = document.querySelector('#capacity');
  var addressInputNode = document.querySelector('#address');

  housingTypeNode.addEventListener('change', function () {
    updatePrice(priceNode, event);
  });

  timeInNode.addEventListener('change', function () {
    synchronizeTime(timeOutNode, event);
  });

  timeOutNode.addEventListener('change', function () {
    synchronizeTime(timeInNode, event);
  });

  roomCountNode.addEventListener('change', function () {
    enableSelecting(capacityNode);
    synchronizeCapacity(capacityNode);
  });


  function synchronizeCapacity(localCapacityNode) {
    var i;
    if (event.target.value === '100') {
      for (i = 0; i < localCapacityNode.children.length - 1; i++) {
        localCapacityNode.children[i].disabled = true;
      }
      localCapacityNode.value = '0';
    } else {
      localCapacityNode.lastElementChild.disabled = true;
      for (i = localCapacityNode.children.length - 2 - event.target.value; i >= 0; i--) {
        localCapacityNode.children[i].disabled = true;
      }
      localCapacityNode.value = event.target.value;
    }
  }

  function enableSelecting(localSelectingNode) {
    for (var i = 0; i < localSelectingNode.children.length; i++) {
      localSelectingNode.children[i].disabled = false;
    }
  }

  function synchronizeTime(syncNode, evt) {
    syncNode.value = evt.target.value;
  }

  function updatePrice(localPriceNode, evt) {
    var minPriceList = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    };
    localPriceNode.placeholder = minPriceList[evt.target.value];
    localPriceNode.min = minPriceList[evt.target.value];
  }

  function getCoordinates(mark) {
    var coordinateX = parseInt(mark.style.left, 10) + 25;
    var coordinateY = parseInt(mark.style.top, 10) + 80;
    var coordinates = [coordinateX, coordinateY];
    return coordinates;
  }


  window.form = {

    disableForm: function (form) {
      form.classList.add('ad-form--disabled');
      for (var i = 0; i < form.children.length; i++) {
        form.children[i].setAttribute('disabled', '');
      }
    },

    enableForm: function (form) {
      form.classList.remove('ad-form--disabled');
      for (var i = 0; i < form.children.length; i++) {
        form.children[i].removeAttribute('disabled');
      }
    },
    fillAddress: function (mark) {
      addressInputNode.value = getCoordinates(mark);
    }
  };
})();
