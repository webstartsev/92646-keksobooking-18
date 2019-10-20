'use strict';

(function () {
  var MAX_ROOMS = 100;
  var DEFAULT_PREVIEW_IMG = 'img/muffin-grey.svg';
  var PriceForType = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var adForm = document.querySelector('.ad-form');
  var resetFormBtn = document.querySelector('.ad-form__reset');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var houseType = document.querySelector('#type');
  var price = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var avatar = adForm.querySelector('#avatar');
  var previewImg = adForm.querySelector('.ad-form-header__preview img');

  var images = adForm.querySelector('#images');

  var features = adForm.querySelector('.features');

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
      adForm.classList.remove('ad-form--disabled');

      var fieldsets = adForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = false;
      });
    },
    deactivate: function () {
      adForm.classList.add('ad-form--disabled');
      adForm.reset();

      var fieldsets = adForm.querySelectorAll('fieldset');
      fieldsets.forEach(function (fieldset) {
        fieldset.disabled = true;
      });

      var photos = adForm.querySelectorAll('.ad-form__photo');
      photos.forEach(function (photo) {
        photo.remove();
      });

      previewImg.src = DEFAULT_PREVIEW_IMG;
    }
  };

  // Обработчик ошибочной отправки формы
  var errorHandler = function (errorMessage) {
    showError(errorMessage);
    window.popup.remove();
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
    window.popup.remove();
    window.map.deactivate();
    window.mainPin.setDeafultPosition();
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
    window.ai.calculatePrice();
  });
  capacity.addEventListener('change', function () {
    checkCountRoomsAndPeople();
  });

  houseType.addEventListener('change', function () {
    price.setAttribute('min', PriceForType[houseType.value]);
    window.ai.calculatePrice();
  });

  timeIn.addEventListener('change', function () {
    syncTime(timeIn);
  });
  timeOut.addEventListener('change', function () {
    syncTime(timeOut);
  });

  avatar.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    readFile(file, function (evtFile) {
      previewImg.src = evtFile.target.result;
    });
  });
  images.addEventListener('change', function (evt) {
    var files = evt.target.files;

    Array.from(files).forEach(function (file) {
      readFile(file, function (evtFile) {
        renderPhoto(evtFile.target.result);
        window.ai.calculatePrice();
      });
    });
  });

  features.addEventListener('change', function () {
    window.ai.calculatePrice();
  });

  resetFormBtn.addEventListener('click', function () {
    window.form.deactivate();
    window.pins.remove();
    window.popup.remove();
    window.map.deactivate();
    window.mainPin.setDeafultPosition();
  });

  var renderPhoto = function (src) {
    var photo = document.querySelector('#photo').content.querySelector('div');
    var template = photo.cloneNode(true);
    template.querySelector('img').src = src;
    document.querySelector('.ad-form__photo-container').insertAdjacentElement('beforeend', template);
  };

  var readFile = function (file, callback) {
    if (file) {
      var reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = function (evt) {
        callback(evt);
      };
      reader.onerror = function () {
        showError('Произошла ошибка загрузки');
        return false;
      };
    }
  };

  checkCountRoomsAndPeople();
})();
