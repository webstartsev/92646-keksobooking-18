'use strict';
(function () {
  var COUNT = 8;

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var ADDRESS_MIN = 100;
  var ADDRESS_MAX = 600;
  var PRICE_MIN = 100;
  var PRICE_MAX = 1000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 4;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 4;

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var PATH_TO_PHOTO = 'http://o0.github.io/assets/images/tokyo/hotel';

  window.data = {
    generateMockData: function () {
      var mockList = [];
      for (var i = 1; i <= COUNT; i++) {
        var mock = {
          avatar: 'img/avatars/user0' + i + '.png',
          offer: {
            title: 'Заголовок' + i,
            address: window.utils.getRandomArbitrary(ADDRESS_MIN, ADDRESS_MAX) + ', ' + window.utils.getRandomArbitrary(ADDRESS_MIN, ADDRESS_MAX),
            price: window.utils.getRandomArbitrary(PRICE_MIN, PRICE_MAX),
            type: TYPES[window.utils.getRandomArbitrary(0, TYPES.length - 1)],
            rooms: window.utils.getRandomArbitrary(ROOMS_MIN, ROOMS_MAX),
            guests: window.utils.getRandomArbitrary(GUESTS_MIN, GUESTS_MAX),
            checkin: CHECKIN[window.utils.getRandomArbitrary(0, CHECKIN.length - 1)],
            checkout: CHECKOUT[window.utils.getRandomArbitrary(0, CHECKIN.length - 1)],
            features: this.getFeatures(FEATURES),
            description: 'Описание' + i,
            photos: this.getPhotos()
          },
          location: {
            x: window.utils.getRandomArbitrary(0, MAP_WIDTH),
            y: window.utils.getRandomArbitrary(LOCATION_Y_MIN, LOCATION_Y_MAX)
          }
        };
        mockList.push(mock);
      }

      return mockList;
    },
    getFeatures: function (features) {
      var countFeatures = window.utils.getRandomArbitrary(1, features.length - 1);
      var featuresList = [];
      for (var i = 0; i < countFeatures; i++) {
        featuresList.push(features[window.utils.getRandomArbitrary(0, features.length - 1)]);
      }

      return featuresList;
    },
    getPhotos: function () {
      var countPhotos = window.utils.getRandomArbitrary(1, 10);
      var photosList = [];
      for (var i = 0; i < countPhotos; i++) {
        photosList.push(PATH_TO_PHOTO + window.utils.getRandomArbitrary(1, 3) + '.jpg');
      }

      return photosList;
    }
  };
})();
