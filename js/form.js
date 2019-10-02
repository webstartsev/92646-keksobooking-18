'use strict';

(function () {
  var MAX_ROOMS = 100;
  var PRICE_FOR_TYPE = {'palace': 10000, 'flat': 1000, 'house': 5000, 'bungalo': 0};

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var houseType = document.querySelector('#type');
  var price = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var syncTime = function (time) {
    timeIn.value = time.value;
    timeOut.value = time.value;
  };

  // Провоерка соответсвия «Количество комнат» и «Количество мест»
  var checkCountRoomsAndPeople = function () {
    var countRooms = parseInt(roomNumber.value, 10);
    var countPeople = parseInt(capacity.value, 10);

    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');

    if (countPeople === 0 && countRooms !== MAX_ROOMS) {
      roomNumber.setCustomValidity('Необходимо не менее 100 комнат');
    } else if (countRooms === MAX_ROOMS && countPeople !== 0) {
      capacity.setCustomValidity('Только не для гостей');
    } else if (countRooms < countPeople && countPeople !== 0) {
      capacity.setCustomValidity('Кол-ва людей больше чем мест');
    }
  };

  // Активация формы
  window.form = {
    activate: function () {
      var adForm = document.querySelector('.ad-form');
      adForm.classList.remove('ad-form--disabled');

      var fieldsets = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    },
  };

  // События валидации «Количество комнат» и «Количество мест»
  roomNumber.addEventListener('change', function () {
    checkCountRoomsAndPeople();
  });
  capacity.addEventListener('change', function () {
    checkCountRoomsAndPeople();
  });

  houseType.addEventListener('change', function () {
    price.setAttribute('min', PRICE_FOR_TYPE[houseType.value]);
  });

  timeIn.addEventListener('change', function () {
    syncTime(timeIn);
  });
  timeOut.addEventListener('change', function () {
    syncTime(timeOut);
  });

  checkCountRoomsAndPeople();
})();
