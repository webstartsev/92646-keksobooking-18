'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGNT = 65;
  var MAIN_PIN_ARROW_HEIGNT = 22;
  var MAIN_PIN_CENTER_X = (MAIN_PIN_WIDTH / 2);
  var MAIN_PIN_CENTER_Y = (MAIN_PIN_HEIGNT / 2);

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var pinMain = document.querySelector('.map__pin--main');
  var defaultCoordX = pinMain.offsetLeft;
  var defaultCoordY = pinMain.offsetTop;

  window.mainPin = {
    setCoords: function (isDisabled) {
      var pinCoordsX = Math.round(pinMain.offsetLeft + MAIN_PIN_CENTER_X);
      var pinCoordsY = Math.round(pinMain.offsetTop + MAIN_PIN_HEIGNT + MAIN_PIN_ARROW_HEIGNT);

      if (isDisabled) {
        pinCoordsX = Math.round(pinMain.offsetLeft + MAIN_PIN_CENTER_X);
        pinCoordsY = Math.round(pinMain.offsetTop + MAIN_PIN_CENTER_Y);
      }

      document.querySelector('#address').value = pinCoordsX + ', ' + pinCoordsY;
    },
    checkLocation: function () {
      // ограничение слева/справа
      if (pinMain.offsetLeft <= 0 - MAIN_PIN_CENTER_X) {
        pinMain.style.left = Math.floor(0 - MAIN_PIN_CENTER_X) + 'px';
      } else if (pinMain.offsetLeft + MAIN_PIN_CENTER_X >= MAP_WIDTH) {
        pinMain.style.left = Math.floor(MAP_WIDTH - MAIN_PIN_CENTER_X) + 'px';
      }
      // ограничение сверху/внизу
      if (pinMain.offsetTop + MAIN_PIN_HEIGNT <= LOCATION_Y_MIN) {
        pinMain.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGNT + 'px';
      } else if (pinMain.offsetTop + MAIN_PIN_HEIGNT >= LOCATION_Y_MAX) {
        pinMain.style.top = Math.floor(LOCATION_Y_MAX - MAIN_PIN_HEIGNT) + 'px';
      }
    },
    setDeafultPosition: function () {
      pinMain.style.left = defaultCoordX + 'px';
      pinMain.style.top = defaultCoordY + 'px';

      window.mainPin.setCoords(true);
    }
  };

  // События Активации карты
  pinMain.addEventListener('mousedown', function () {
    if (!window.map.isActive) {
      window.map.init();
    }
  });
  pinMain.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, function () {
      if (!window.map.isActive) {
        window.map.init();
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

      window.mainPin.checkLocation();
      window.mainPin.setCoords();

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
})();
