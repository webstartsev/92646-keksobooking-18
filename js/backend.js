'use strict';

(function () {
  var onLoadHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };
  var onErrorHandler = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000; // 10s

      onLoadHandler(xhr, onLoad, onError);
      onErrorHandler(xhr, onError);

      xhr.open('GET', url);
      xhr.send();
    },
    save: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000; // 10s

      onLoadHandler(xhr, onLoad, onError);
      onErrorHandler(xhr, onError);

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
