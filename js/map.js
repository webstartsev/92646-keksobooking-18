'use strict';

(function () {
  window.map = {
    isActive: false,
    activate: function () {
      window.map.isActive = true;
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
    },
    deactivate: function () {
      window.map.isActive = false;
      document.querySelector('.map').classList.add('map--faded');

      var mapFilters = document.querySelector('.map__filters');

      var selects = mapFilters.querySelectorAll('select');
      var fieldsets = mapFilters.querySelectorAll('fieldset');
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
      }
      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].disabled = true;
      }
    },
    init: function () {
      window.map.activate();
      window.mainPin.setCoords();
      window.backend.load(window.config.URL_DATA, succesHandler, errorHandler);
    }
  };

  var succesHandler = function (data) {
    window.pins.copyData(data);
    window.pins.render(data);
  };
  var errorHandler = function (errorMessage) {
    var cardError = document.querySelector('#error').content.querySelector('div');
    var template = cardError.cloneNode(true);

    template.querySelector('.error__message').textContent = errorMessage;

    var reloadDataBtn = template.querySelector('.error__button');
    reloadDataBtn.addEventListener('click', function () {
      removeErrorMsg();
      window.backend.load(window.config.URL_DATA, succesHandler, errorHandler);
    });
    reloadDataBtn.addEventListener('keydown', function (evt) {
      window.utils.onEnterPress(evt, function () {
        removeErrorMsg();
        window.backend.load(window.config.URL_DATA, succesHandler, errorHandler);
      });
    });

    document.body.insertAdjacentElement('beforeBegin', template);
  };
  var removeErrorMsg = function () {
    document.querySelector('.error').remove();
  };

  window.mainPin.setCoords(true);
})();
