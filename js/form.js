'use strict';

(function () {
  var MAX_ROOMS = 100;
  var PRICE_FOR_TYPE = {'palace': 10000, 'flat': 1000, 'house': 5000, 'bungalo': 0};

  var adForm = document.querySelector('.ad-form');

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

  var resetInput = function (fieldset) {
    var input = fieldset.querySelector('input');
    if (input) {
      input.value = '';
    }

    var textarea = fieldset.querySelector('textarea');
    if (textarea) {
      textarea.value = '';
    }

    var checkboxs = fieldset.querySelectorAll('input[type=checkbox]');
    if (checkboxs.length) {
      for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = false;
      }
    }
  };

  // Активация формы
  window.form = {
    activate: function () {
      adForm.classList.remove('ad-form--disabled');

      var fieldsets = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    },
    deactivate: function () {
      adForm.classList.add('ad-form--disabled');
      var fieldsets = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
        resetInput(fieldsets[i]);
      }
    }
  };

  // Обработчик ошибочной отправки формы
  var errorHandler = function (errorMessage) {
    showError(errorMessage);
    window.popup.removePopup();
  };
  var showError = function (errorMessage) {
    var cardError = document.querySelector('#error').content.querySelector('div');
    var template = cardError.cloneNode(true);
    template.querySelector('.error__message').textContent = errorMessage;
    document.querySelector('main').insertAdjacentElement('afterbegin', template);

    var reloadDataBtn = template.querySelector('.error__button');
    reloadDataBtn.addEventListener('click', removeErrorMsg);
    document.addEventListener('keydown', removeErrorMsgOnEsc);
    document.querySelector('.error').addEventListener('click', removeErrorMsg);
  };
  var removeErrorMsgOnEsc = function (evt) {
    window.utils.onEscPress(evt, function () {
      removeErrorMsg();
    });
  };
  var removeErrorMsg = function (evt) {
    evt.stopPropagation();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', removeErrorMsgOnEsc);
  };

  // Обработчик положительной отправки формы
  var successHandler = function () {
    window.form.deactivate();
    window.pins.remove();
    window.popup.removePopup();
    window.map.deactivate();
    showSucces();
  };
  var showSucces = function () {
    var cardSuccess = document.querySelector('#success').content.querySelector('div');
    var template = cardSuccess.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', template);

    document.addEventListener('keydown', removeSuccessMsgOnEsc);
    document.querySelector('.success').addEventListener('click', removeSuccessMsg);
  };
  var removeSuccessMsgOnEsc = function (evt) {
    window.utils.onEscPress(evt, function () {
      removeSuccessMsg();
    });
  };
  var removeSuccessMsg = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', removeSuccessMsgOnEsc);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(window.config.URL_SAVE, new FormData(adForm), successHandler, errorHandler);
    evt.preventDefault();
  });

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
