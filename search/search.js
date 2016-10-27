var search = (function () {

  var searchService = 'http://localhost:3001/search/';
  var companyService = 'http://localhost:3001/company/';

  var autocomplete;
  var $search, $searchButton, $searchPage, $resultPage, $homeButton;

  document.addEventListener('DOMContentLoaded', init, false);

  function init() {

    $search = document.querySelector('.search');
    $searchButton = document.querySelector('.search-button');
    $searchPage = document.querySelector('.search-page');
    $resultPage = document.querySelector('.result-page');
    $homeButton  = document.querySelector('.home-button');

    initAutocomplete();
    bindEvents();
  }

  function initAutocomplete() {

    autocomplete = new Awesomplete($search, {
      minChars: 1,
      autoFirst: true
    });

    $search.addEventListener('awesomplete-selectcomplete', handleComplete, false);
  }

  function bindEvents() {

    // $searchButton.addEventListener('click', handleClick, false);
    // $search.addEventListener('keypress', handleEnter, false);
    $search.addEventListener('keyup', handleSearch, false);
    $homeButton.addEventListener('click', openSearchPage, false);
  }

  function handleSearch(event) {

    // Ignore arrow up and arrow down
    if(event.keyCode != 39 && event.keyCode != 40) {

      // Get data from remote server via AJAX
      utils.getJson(searchService + this.value, function (results, error) {

        if (!error) {

          var list = [];

          results.forEach(function (arr) {

            list.push({ label: arr[1], value: arr[0] });
          });

          autocomplete.list = list;
        }
      });
    }
  }

  function handleComplete(event) {

    var companyId = event.text.value;

    utils.getJson(companyService + companyId, function (company, error) {

      if (!error) {

        openResultPage(company[0]);
      }
    });
  }

  function openResultPage(company) {

    console.log(company);

    $searchPage.style.display = 'none';
    $resultPage.style.display = 'block';
  }

  function openSearchPage() {

    $searchPage.style.display = 'block';
    $resultPage.style.display = 'none';
  }

  return {

    init: init,
    search: search
  };
})();
