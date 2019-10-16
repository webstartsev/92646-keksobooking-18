'use strict';

(function () {
  var DictionaryType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  // Личный проект: больше деталей
  var fillTemplateCard = function (data) {
    var offer = data.offer;
    var avatar = data.author.avatar;

    var cardTemplate = document.querySelector('#card').content.querySelector('article');
    var template = cardTemplate.cloneNode(true);

    template.querySelector('.popup__title').textContent = offer.title;
    template.querySelector('.popup__text--address').textContent = offer.address;
    template.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = DictionaryType[offer.type];
    template.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    var fragmentFeatures = document.createDocumentFragment();
    for (var indexFeature = 0; indexFeature < offer.features.length; indexFeature++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + offer.features[indexFeature]);
      fragmentFeatures.appendChild(li);
    }
    template.querySelector('.popup__features').innerHTML = '';
    template.querySelector('.popup__features').appendChild(fragmentFeatures);

    template.querySelector('.popup__description').textContent = offer.description;

    var fragmentPhoto = document.createDocumentFragment();
    for (var indexPhoto = 0; indexPhoto < offer.photos.length; indexPhoto++) {
      var img = document.createElement('img');
      img.src = offer.photos[indexPhoto];
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      fragmentPhoto.appendChild(img);
    }
    template.querySelector('.popup__photos').innerHTML = '';
    template.querySelector('.popup__photos').appendChild(fragmentPhoto);

    template.querySelector('.popup__avatar').src = avatar;

    return template;
  };

  var insertTemplateCard = function (template) {
    document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', template);
  };

  var openPopup = function (data) {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    var template = fillTemplateCard(data);
    insertTemplateCard(template);
    document.addEventListener('keydown', onPopupEscPress);
    closePopupHandler();
  };

  var closePopupHandler = function () {
    var closePopup = document.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      window.popup.remove();
    });
  };

  var onPopupEscPress = function (evt) {
    window.utils.onEscPress(evt, window.popup.remove);
  };

  window.popup = {
    openPopupHandler: function (pin, data) {
      pin.addEventListener('click', function () {
        openPopup(data);
      });
      pin.addEventListener('keydown', function (evt) {
        window.utils.onEscPress(evt, function () {
          openPopup(data);
        });
      });
    },
    remove: function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }
  };
})();
