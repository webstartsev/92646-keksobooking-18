'use strict';

(function () {
  window.utils = {
    getRandomArbitrary: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  };
})();
