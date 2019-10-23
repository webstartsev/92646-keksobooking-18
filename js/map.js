'use strict';

(function () {
  window.map = {
    isActive: false,
    activate: function () {
      window.map.isActive = true;
      document.querySelector('.map').classList.remove('map--faded');
      window.filter.activate();
    },
    deactivate: function () {
      window.map.isActive = false;
      document.querySelector('.map').classList.add('map--faded');
      window.filter.deactivate();
    },
    init: function () {
      window.map.activate();
      window.form.activate();
      window.mainPin.setCoords();
      window.backend.load(window.config.URL_DATA, succesHandler, errorHandler);
    }
  };

  var succesHandler = function (data) {
    window.filter.copyData(data);
    window.pins.render(data);
    window.ai.clusterData(data);
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
