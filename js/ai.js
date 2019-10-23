'use strict';

(function () {
  var Types = {
    'bungalo': [],
    'flat': [],
    'house': [],
    'palace': [],
  };

  var adForm = document.querySelector('.ad-form');

  var houseType = adForm.querySelector('#type');
  var roomNumber = adForm.querySelector('#room_number');
  var features = adForm.querySelector('.features');
  var capacity = adForm.querySelector('#capacity');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var photosContainer = adForm.querySelector('.ad-form__photo-container');
  var price = adForm.querySelector('#price');

  var setPrice = function (sum) {
    price.value = parseInt(sum, 10);
  };

  var getFeature = function () {
    var featureList = features.querySelectorAll('input[name=features]');
    var result = [];
    Array.from(featureList).forEach(function (item) {
      if (item.checked) {
        result.push(item.value);
      }
    });
    return result;
  };
  var getCountPhotos = function (container) {
    var count = container.querySelectorAll('.ad-form__photo').length;
    return count;
  };
  var getInputValue = function (container) {
    return parseInt(container.value, 10);
  };
  var getHouseType = function () {
    return houseType.value;
  };

  var getCountEquils = function (array1, array2) {
    var count = 0;
    array1.forEach(function (it) {
      if (array2.includes(it)) {
        count++;
      }
    });
    return count;
  };

  var simOffers = function (myOffer, offer) {
    var si = [];
    var keys = Object.keys(myOffer);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'type') {
        continue;
      }
      if (offer[keys[i]] !== undefined) {
        si.push(keys[i]);
      }
    }
    var n = si.length;
    if (!n) {
      return 0;
    }

    var countEquilsFeature = getCountEquils(myOffer['features'], offer['features']);

    var sum1 = si.reduce(function (acc, it) {
      if (Array.isArray(myOffer[it])) {
        acc += countEquilsFeature;
      } else {
        acc += myOffer[it];
      }
      return acc;
    }, 0);
    var sum2 = si.reduce(function (acc, it) {
      if (Array.isArray(offer[it])) {
        acc += countEquilsFeature;
      } else {
        acc += offer[it];
      }
      return acc;
    }, 0);

    var sum1Sq = si.reduce(function (acc, it) {
      if (Array.isArray(myOffer[it])) {
        acc += Math.pow(countEquilsFeature, 2);
      } else {
        acc += Math.pow(myOffer[it], 2);
      }
      return acc;
    }, 0);
    var sum2Sq = si.reduce(function (acc, it) {
      if (Array.isArray(offer[it])) {
        acc += Math.pow(countEquilsFeature, 2);
      } else {
        acc += Math.pow(offer[it], 2);
      }
      return acc;
    }, 0);

    var pSum = si.reduce(function (acc, it) {
      if (Array.isArray(myOffer[it]) && Array.isArray(offer[it])) {
        acc += countEquilsFeature * countEquilsFeature;
      } else {
        acc += myOffer[it] * offer[it];
      }
      return acc;
    }, 0);

    var num = pSum - (sum1 * sum2 / n);

    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));
    if (!den) {
      return 0;
    }

    var r = num / den;
    return r;
  };

  var getSimilar = function (offers) {
    var max = offers[0];
    offers.forEach(function (offer) {
      if (offer.r > max.r) {
        max = offer;
      }
    });
    return max;
  };

  window.ai = {
    calculatePrice: function () {
      var myOffer = {
        features: getFeature(),
        guests: getInputValue(capacity),
        rooms: getInputValue(roomNumber),
        checkin: getInputValue(timein),
        checkout: getInputValue(timeout),
        photos: getCountPhotos(photosContainer),
        type: getHouseType(houseType),
      };

      if (!Types[myOffer.type].length) {
        setPrice(0);
        return;
      }

      Types[myOffer.type].forEach(function (offer, index) {
        Types[myOffer.type][index].r = simOffers(myOffer, offer);
      });

      var similarOffer = getSimilar(Array.from(Types[myOffer.type]));

      myOffer.price = parseInt(similarOffer.price * similarOffer.r, 10);
      setPrice(myOffer.price);
    },
    clusterData: function (data) {
      data.forEach(function (item) {
        delete item.offer.address;
        delete item.offer.description;
        delete item.offer.title;

        item.offer.checkin = parseInt(item.offer.checkin, 10);
        item.offer.checkout = parseInt(item.offer.checkout, 10);
        item.offer.photos = item.offer.photos.length;

        Types[item.offer.type].push(item.offer);
      });
    }
  };
})();
