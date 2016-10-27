var search = (function () {

  var searchService = 'http://localhost:3001/search/';
  var companyService = 'http://localhost:3001/company/';

  var autocomplete;
  var $search, $searchButton, $searchPage, $result, $resultPage, $homeButton;

  document.addEventListener('DOMContentLoaded', init, false);

  function init() {

    $search = document.querySelector('.search');
    $searchPage = document.querySelector('.search-page');
    $searchButton = document.querySelector('.search-button');

    $result = document.querySelector('.result');
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

    $searchPage.style.display = 'none';
    $resultPage.style.display = 'block';

    utils.emptyElement($result);
    utils.createElement('h1', $result, ['textContent', company.name]);

    utils.createElement('p', $result,
      ['textContent', 'Capital: ' + niceNumber(company.capital) + ' ' + company.capital_curreny]);


    var $parents = utils.createElement('div', $result);
    utils.createElement('h3', $parents, ['textContent', 'Shares held by']);
    var $parentsList = utils.createElement('ul', $parents);

    var $children = utils.createElement('div', $result);
    utils.createElement('h3', $children, ['textContent', 'Shareholder of']);
    var $childrenList = utils.createElement('ul', $children);

    getRelatedCompanies(company.parents, renderParent);
    getRelatedCompanies(company.children, renderChild);

    function renderParent(parent) {

      utils.createElement('li', $parentsList, ['textContent', parent.name]);
    }

    function renderChild(child) {

      utils.createElement('li', $childrenList, ['textContent', child.name]);
    }

    // @TODO Don't use innerHTML
    var $source = utils.createElement('p', $result);
    $source.innerHTML = 'Source: <a href="' + company.source_link + '">' + company.source + '</a>';
  }

  function getRelatedCompanies(parents, callback) {

    parents.forEach(function (companyId) {

      utils.getJson(companyService + companyId, function (company, error) {

        if (!error) {

          callback(company[0]);
        }
      });
    });
  }

  function openSearchPage() {

    $searchPage.style.display = 'block';
    $resultPage.style.display = 'none';
  }

  function niceNumber(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return {

    init: init,
    search: search
  };
})();
