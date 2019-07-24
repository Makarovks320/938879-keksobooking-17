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

  /*
надо сделать функцию, чтобы при изменении фильтра (любого) обновлялась карта.
Эту функцию надо вешать на все селекты по событию чэйндж
она при любом вызове проходит по нужным ДОМ-элементам, считывает их, проверяет и возвращает
объект такого типа:
{
  roomsCount: 12,
  houseType: 'home'
}
можно создать коллекцию ДОМ-элемнетов (селектов и инпутов - 2 коллекции),
и повесить на каждый элемент этой коллекции слушатель на событие  ЧЭЙНДЖ с обработчиком, который  проходит по всем инпутам и селектам,
которая считывает с них данные и возвращает объект, указанный выше. Этот объект надо записать в переменную
var activeFilters = {} в модуле form. и добавить его в window.form.getActiveFilters = function
  */

  /* функция updateFilters будет висеть на всех инпутах и селектах
  inputs.addEventListener('change', function () {
    activeFilters = updateFilters();
  });
*/

  // собираю коллекции нужных селектов и инпутов:
  var selectsCollection = document.querySelector('.map__filters').querySelectorAll('select');
  // var inputsCollection = document.querySelector('#housing-features').querySelectorAll('input');

  // функция добавления слушателя на ЧЕЙНДЖ для каждого элемента коллекции:
  function listenFilterChange(collection) {
    for (var j = 0; j < collection.length; j++) {
      collection[j].addEventListener('change', function (evt) {
        updateFilters(evt);
        window.map.updatePins(activeFilters);
      });
    }
  }
  // создам объект со свойствами - именами и значениями селектов
  var activeFilters = {};
  for (var i = 0; i < selectsCollection.length; i++) {
    activeFilters[selectsCollection[i].name] = selectsCollection[i].value;
  }
  // функция чтения фильтров. Проходит по коллекциям селектов и  инпутов и  собирает объект с их значениями
  function updateFilters(evt) {
    activeFilters[evt.target.name] = evt.target.value;
    return activeFilters;
  }

  // добавляю функции к коллекциям:
  listenFilterChange(selectsCollection);
  // listenFilterChange(inputsCollection);

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
