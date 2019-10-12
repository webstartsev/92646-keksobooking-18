'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomArbitrary: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    onEscPress: function (evt, action) {
      if (evt.keyCode === this.ESC_KEYCODE) {
        action();
      }
    },
    onEnterPress: function (evt, action) {
      if (evt.keyCode === this.ENTER_KEYCODE) {
        action();
      }
    },
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
