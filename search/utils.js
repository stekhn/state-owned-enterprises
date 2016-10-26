var utils = (function () {

  function getJson(url, callback) {

    var httpRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    httpRequest.onreadystatechange = function () {

      if (httpRequest.readyState === 4 || httpRequest.readyState === 0) {

        if (httpRequest.status === 200) {

          try {

            callback(JSON.parse(httpRequest.responseText));
          } catch (error) {

            console.error(error);

            callback({}, {
              message: 'Fehler: unerwartete Antwort vom Server'
            });
          }
        } else {

          callback({}, {
            message: 'Fehler: falsche Anfrage oder Ressource nicht verfügbar'
          });
        }
      }
    };

    httpRequest.onerror = function (error) {

      console.error(error);

      callback({}, {
        message: 'Fehler: keine Antwort vom Server'
      });
    };

    httpRequest.open('GET', url);
    httpRequest.send();
  }

  return {
    getJson: getJson
  };
})();
