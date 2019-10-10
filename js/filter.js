'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var filterType = filter.querySelector('#housing-type');

  filterType.addEventListener('change', function (evt) {
    window.pins.filter('type', (evt.target.value));
  });
})();
