'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

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
    }
  };
})();
