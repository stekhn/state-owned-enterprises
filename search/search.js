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

  function handleSearch() {

    utils.getJson(searchServiceUrl + this.value, function (results, error) {

      if (!error) {

        var list = [];

        results.forEach(function(key, value) {

          list.push(value.name);
        });

        autocomplete.list = list;
      }
    });
  }

  return {

    init: init,
    search: search
  };
})();
