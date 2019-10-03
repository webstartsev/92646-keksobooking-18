'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGNT = 65;
  var MAIN_PIN_ARROW_HEIGNT = 22;

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var URL_DATA = 'https://js.dump.academy/keksobooking/data';

  var renderPins = false;
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  // Активация Карты
  var activeMap = function () {
    document.querySelector('.map').classList.remove('map--faded');

    var mapFilters = document.querySelector('.map__filters');

    var selects = mapFilters.querySelectorAll('select');
    var fieldsets = mapFilters.querySelectorAll('fieldset');
    for (var i = 0; i < selects.length; i++) {
      selects[i].disabled = false;
    }
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].disabled = false;
    }
  };

  // Установка координат для главной точки
  var setCoordMainPin = function (isDisabled) {
    var pinCoordsX = Math.round(pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2));
    var pinCoordsY = Math.round(pinMain.offsetTop + MAIN_PIN_HEIGNT + MAIN_PIN_ARROW_HEIGNT);

    if (isDisabled) {
      pinCoordsX = Math.round(pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2));
      pinCoordsY = Math.round(pinMain.offsetTop + (MAIN_PIN_HEIGNT / 2));
    }

    inputAddress.value = pinCoordsX + ', ' + pinCoordsY;
  };

  // Проверяет выходит ли главная точка за границы диапазона
  var checkLocationMainPin = function () {
    // ограничение слева/справа
    if (pinMain.offsetLeft <= 0 - (MAIN_PIN_WIDTH / 2)) {
      pinMain.style.left = Math.floor(0 - (MAIN_PIN_WIDTH / 2)) + 'px';
    } else if (pinMain.offsetLeft + (MAIN_PIN_WIDTH / 2) >= MAP_WIDTH) {
      pinMain.style.left = Math.floor(MAP_WIDTH - (MAIN_PIN_WIDTH / 2)) + 'px';
    }
    // ограничение сверху/внизу
    if (pinMain.offsetTop + MAIN_PIN_HEIGNT <= LOCATION_Y_MIN) {
      pinMain.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGNT + 'px';
    } else if (pinMain.offsetTop + MAIN_PIN_HEIGNT >= LOCATION_Y_MAX) {
      pinMain.style.top = Math.floor(LOCATION_Y_MAX - MAIN_PIN_HEIGNT) + 'px';
    }
  };

  var succesHandler = function (data) {
    window.pin.renderPins(data);
    window.form.activate();

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      window.popup.openPopupHandler(pins[i], data[i]);
    }
  };

  var errorHandler = function (errorMessage) {
    var cardError = document.querySelector('#error').content.querySelector('div');
    var template = cardError.cloneNode(true);

    template.querySelector('.error__message').textContent = errorMessage;

    var reloadDataBtn = template.querySelector('.error__button');
    reloadDataBtn.addEventListener('click', function () {
      removeErrorMsg();
      loadData();

    });
    reloadDataBtn.addEventListener('keydown', function (evt) {
      window.utils.onEnterPress(evt, function () {
        removeErrorMsg();
        loadData();
      });
    });

    document.body.insertAdjacentElement('beforeBegin', template);
  };

  var loadData = function () {
    window.backend.load(URL_DATA, succesHandler, errorHandler);
  };
  var removeErrorMsg = function () {
    document.querySelector('.error').remove();
  };

  var init = function () {
    renderPins = true;
    activeMap();
    setCoordMainPin();
    loadData();
  };

  // События Активации карты
  pinMain.addEventListener('mousedown', function () {
    if (!renderPins) {
      init();
    }
  });
  pinMain.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, function () {
      if (!renderPins) {
        init();
      }
    });
  });

  // События Перетаскивания главной точки
  pinMain.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var drag = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      drag = true;

      var diff = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - diff.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - diff.y) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      checkLocationMainPin();
      setCoordMainPin();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (drag) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  setCoordMainPin(true);

})();
