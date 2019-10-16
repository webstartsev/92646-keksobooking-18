'use strict';

(function () {
  var Price = {
    Select: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    },
    Value: {
      MIN: 10000,
      MAX: 50000
    }
  };

  var pins = [];

  var mapFilter = document.querySelector('.map__filters');

  var housingType = mapFilter.querySelector('#housing-type');
  var housingRooms = mapFilter.querySelector('#housing-rooms');
  var housingGuests = mapFilter.querySelector('#housing-guests');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingFeatures = mapFilter.querySelector('#housing-features');

  var checkType = function (pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  };
  var checkRooms = function (pin) {
    return housingRooms.value === 'any' ? true : parseInt(housingRooms.value, 10) === pin.offer.rooms;
  };
  var checkGuests = function (pin) {
    return housingGuests.value === 'any' ? true : parseInt(housingGuests.value, 10) === pin.offer.guests;
  };
  var checkPrice = function (pin) {
    var price = parseInt(pin.offer.price, 10);
    switch (housingPrice.value) {
      case Price.Select.LOW:
        return price < Price.Value.MIN;
      case Price.Select.MIDDLE:
        return price >= Price.Value.MIN && price < Price.Value.MAX;
      case Price.Select.HIGH:
        return price >= Price.Value.MAX;
      default:
        return true;
    }
  };
  var checkFeatures = function (pin) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (item) {
        return item.value;
      })
      .every(function (feature) {
        return pin.offer.features.includes(feature);
      });
  };

  mapFilter.addEventListener('change', window.utils.debounce(function () {
    var filterPins = pins.filter(function (pin) {
      return (
        checkType(pin) &&
        checkRooms(pin) &&
        checkGuests(pin) &&
        checkPrice(pin) &&
        checkFeatures(pin)
      );
    });
    window.pins.render(filterPins);
  }));

  window.filter = {
    copyData: function (data) {
      pins = data.slice();
    }
  };
})();
