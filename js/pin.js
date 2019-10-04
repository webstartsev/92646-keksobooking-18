'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var fillPinTemplate = function (data) {
    var template = pinTemplate.cloneNode(true);

    template.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
    template.style.top = (data.location.y - PIN_HEIGHT) + 'px';

    template.querySelector('img').src = data.author.avatar;
    template.querySelector('img').alt = data.offer.title;

    return template;
  };

  window.pin = {
    renderPins: function (mock) {
      var pinsList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < mock.length; i++) {
        var pin = fillPinTemplate(mock[i]);
        fragment.appendChild(pin);
      }
      pinsList.appendChild(fragment);
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };

})();
