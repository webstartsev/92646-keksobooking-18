'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000; // 10s
  var RESPONSE_TYPE = 'json';

  var loadHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };
  var errorHandler = function (xhr, onError) {
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
      xhr.responseType = RESPONSE_TYPE;
      xhr.timeout = TIMEOUT;

      loadHandler(xhr, onLoad, onError);
      errorHandler(xhr, onError);

      xhr.open('GET', url);
      xhr.send();
    },
    save: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = RESPONSE_TYPE;
      xhr.timeout = TIMEOUT;

      loadHandler(xhr, onLoad, onError);
      errorHandler(xhr, onError);

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
