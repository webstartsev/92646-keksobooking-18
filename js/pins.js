'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var COUNT_PINS = 5;

  var fillPinTemplate = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('button');
    var template = pinTemplate.cloneNode(true);

    template.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
    template.style.top = (data.location.y - PIN_HEIGHT) + 'px';

    template.querySelector('img').src = data.author.avatar;
    template.querySelector('img').alt = data.offer.title;

    return template;
  };

  window.pins = {
    render: function (data) {
      window.pins.remove();
      window.popup.remove();
      var pinsList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      var countPins = data.length > COUNT_PINS ? COUNT_PINS : data.length;
      for (var i = 0; i < countPins; i++) {
        var pin = fillPinTemplate(data[i]);
        fragment.appendChild(pin);
      }
      pinsList.appendChild(fragment);

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < pins.length; j++) {
        window.popup.openHandler(pins[j], data[j]);
      }
    },
    remove: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    },
  };

})();
