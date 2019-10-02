'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGNT = 65;
  var MAIN_PIN_ARROW_HEIGNT = 22;

  var renderPins = false;
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  var mockData = window.data.generateMockData();

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

  var init = function () {
    renderPins = true;
    activeMap();
    setCoordMainPin();

    window.pin.renderPins(mockData);
    window.form.activate();

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      window.popup.openPopupHandler(pins[i], mockData[i]);
    }
  };

  // События Активации карты
  pinMain.addEventListener('mousedown', function () {
    if (!renderPins) {
      init();
    }
  });
  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      if (!renderPins) {
        init();
      }
    }
  });

  setCoordMainPin(true);

})();
