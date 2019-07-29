'use strict';


(function () {

  var housingTypeNode = document.querySelector('#type');
  var priceNode = document.querySelector('#price');
  var timeInNode = document.querySelector('#timein');
  var timeOutNode = document.querySelector('#timeout');
  var roomCountNode = document.querySelector('#room_number');
  var capacityNode = document.querySelector('#capacity');
  var addressInputNode = document.querySelector('#address');

  var adFormNode = document.querySelector('.ad-form');
  var mapFiltersNode = document.querySelector('.map__filters');


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
  function disableForm(form) {
    form.classList.add('ad-form--disabled');
    for (var i = 0; i < form.children.length; i++) {
      form.children[i].setAttribute('disabled', '');
    }
  }
  function enableForm(form) {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < form.children.length; i++) {
      form.children[i].removeAttribute('disabled');
    }
  }

  var selectsCollection = document.querySelector('.map__filters').querySelectorAll('select');
  var inputsCollection = document.querySelector('#housing-features').querySelectorAll('input');

  function listenSelectChange(collection) {
    for (var j = 0; j < collection.length; j++) {
      collection[j].addEventListener('change', function (evt) {
        updateSelectFilters(evt);
        window.map.updatePins(activeFilters);
      });
    }
  }

  function listenInputChange(collection) {
    for (var j = 0; j < collection.length; j++) {
      collection[j].addEventListener('change', function (evt) {
        updateInputFilters(evt);
        window.map.updatePins(activeFilters);
      });
    }
  }

  listenSelectChange(selectsCollection);
  listenInputChange(inputsCollection);

  var activeFilters = getActiveFilters();
  function getActiveFilters() {
    var filters = {};
    for (var i = 0; i < selectsCollection.length; i++) {
      filters[selectsCollection[i].name] = selectsCollection[i].value;
    }
    for (var j = 0; j < inputsCollection.length; j++) {
      filters[inputsCollection[j].value] = inputsCollection[j].checked;
    }
    return filters;
  }

  function updateSelectFilters(evt) {
    activeFilters[evt.target.name] = evt.target.value;
    return activeFilters;
  }
  function updateInputFilters(evt) {
    activeFilters[evt.target.value] = evt.target.checked;
    return activeFilters;
  }

  window.form = {
    disableForm: function () {
      disableForm(adFormNode);
      disableForm(mapFiltersNode);
    },

    enableForm: function () {
      enableForm(adFormNode);
      enableForm(mapFiltersNode);
    },
    fillAddress: function (mark) {
      addressInputNode.value = getCoordinates(mark);
    },
    activeFilters: activeFilters
  };
})();
