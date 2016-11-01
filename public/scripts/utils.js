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

  function createElement(type, parent) {

    var element = document.createElement(type);

    for (var i = 2; i < arguments.length; i++) {

      // Check if object is an array
      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {

        element[arguments[i][0]] = arguments[i][1];
      }
    }

    if (parent && isElement(parent)) {

      parent.appendChild(element);

      return element;
    } else {

      return element;
    }
  }

  function emptyElement(element) {

    while (element.hasChildNodes()) {

      element.removeChild(element.lastChild);
    }
  }

  function isElement(o){

    return (
      typeof HTMLElement === 'object' ? o instanceof HTMLElement :
      o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName==='string'
    );
  }

  return {
    getJson: getJson,
    createElement: createElement,
    emptyElement: emptyElement,
    isElement: isElement
  };
})();
