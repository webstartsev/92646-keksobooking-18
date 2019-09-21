'use strict';

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

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAP_WIDTH = document.querySelector('.map').offsetWidth;

var PATH_TO_PHOTO = 'http://o0.github.io/assets/images/tokyo/hotel';

var getRandomArbitrary = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getFeatures = function (features) {
  var countFeatures = getRandomArbitrary(1, features.length - 1);
  var featuresList = [];
  for (var i = 0; i < countFeatures; i++) {
    featuresList.push(features[getRandomArbitrary(0, features.length - 1)]);
  }

  return featuresList;
};

var getPhotos = function () {
  var countPhotos = getRandomArbitrary(1, 10);
  var photosList = [];
  for (var i = 0; i < countPhotos; i++) {
    photosList.push(PATH_TO_PHOTO + getRandomArbitrary(1, 3) + '.jpg');
  }

  return photosList;
};

var generateMockData = function () {
  var mockList = [];
  for (var i = 1; i <= COUNT; i++) {
    var mock = {
      avatar: 'img/avatars/user0' + i + '.png',
      offer: {
        title: 'Заголовок' + i,
        address: getRandomArbitrary(ADDRESS_MIN, ADDRESS_MAX) + ', ' + getRandomArbitrary(ADDRESS_MIN, ADDRESS_MAX),
        price: getRandomArbitrary(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomArbitrary(0, TYPES.length - 1)],
        rooms: getRandomArbitrary(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomArbitrary(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[getRandomArbitrary(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomArbitrary(0, CHECKIN.length - 1)],
        features: getFeatures(FEATURES),
        description: 'Описание' + i,
        photos: getPhotos()
      },
      location: {
        x: getRandomArbitrary(0, MAP_WIDTH),
        y: getRandomArbitrary(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
    mockList.push(mock);
  }

  return mockList;
};

var activeMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var fillPinTemplate = function (data) {
  var template = pinTemplate.cloneNode(true);

  template.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
  template.style.top = (data.location.y - PIN_HEIGHT) + 'px';

  template.querySelector('img').src = data.avatar;
  template.querySelector('img').alt = data.offer.title;

  return template;
};

var renderPins = function (mock) {
  var pinsList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mock.length; i++) {
    var pin = fillPinTemplate(mock[i]);
    fragment.appendChild(pin);
  }
  pinsList.appendChild(fragment);
};

var mockData = generateMockData();
activeMap();
renderPins(mockData);
