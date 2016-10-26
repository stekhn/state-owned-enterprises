var search = (function () {

  var searchServiceUrl = 'http://localhost:3001/search/';

  var autocomplete;
  var $search, $button, $loading;

  document.addEventListener('DOMContentLoaded', init, false);

  function init() {

    $search = document.getElementById('search');
    $button = document.getElementById('button');
    $loading = document.getElementById('loading');

    initAutocomplete();
    bindEvents();
  }

  function initAutocomplete() {

    autocomplete = new Awesomplete($search, {
      minChars: 1,
      autoFirst: true
    });
  }

  function bindEvents() {

    // $button.addEventListener('click', handleClick, false);
    // $search.addEventListener('keypress', handleEnter, false);
    $search.addEventListener('keyup', handleSearch, false);
  }

  function handleSearch(event) {

    // Ignore arrow up and arrow down
    if(event.keyCode != 39 && event.keyCode != 40) {

      // Get data from remote server via AJAX
      utils.getJson(searchServiceUrl + this.value, function (results, error) {

        if (!error) {

          var list = [];

          results.forEach(function (key) {

            list.push(key);
          });

          autocomplete.list = list;
        }
      });
    }
  }

  return {

    init: init,
    search: search
  };
})();
