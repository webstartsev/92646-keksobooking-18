'use strict';

(function () {
  var Price = {
    HouseType: {
      'bungalo': 1000,
      'flat': 5000,
      'house': 10000,
      'palace': 50000,
    },
    CountRoom: {
      '1': 1000,
      '2': 2000,
      '3': 3000,
      '100': 100000,
    },
    Feature: 1000,
    Photo: 1000
  };

  var adForm = document.querySelector('.ad-form');

  var houseType = adForm.querySelector('#type');
  var roomNumber = adForm.querySelector('#room_number');
  var features = adForm.querySelector('.features');
  var photos = adForm.querySelector('.ad-form__photo-container');

  var price = adForm.querySelector('#price');

  var setPrice = function (sum) {
    price.value = parseInt(sum, 10);
  };

  var getPriceForHouseType = function (container) {
    return Price.HouseType[container.value];
  };
  var getPriceForCountRoom = function (container) {
    return Price.CountRoom[container.value];
  };
  var getPriceForFeature = function (container) {
    var featureList = container.querySelectorAll('input[name=features]');
    var sum = 0;
    Array.from(featureList).forEach(function (item) {
      if (item.checked) {
        sum += Price.Feature;
      }
    });

    return sum;
  };
  var getPriceForPhoto = function (container) {
    var photoList = container.querySelectorAll('.ad-form__photo');
    var sum = 0;
    Array.from(photoList).forEach(function () {
      sum += Price.Photo;
    });

    return sum;
  };

  window.ai = {
    calculatePrice: function () {
      var sum = 0;
      sum += getPriceForHouseType(houseType);
      sum += getPriceForCountRoom(roomNumber);
      sum += getPriceForFeature(features);
      sum += getPriceForPhoto(photos);

      setPrice(sum);
    }
  };
})();
