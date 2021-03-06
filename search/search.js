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
      maxItems: 5,
      autoFirst: true
    });

    $search.addEventListener('awesomplete-selectcomplete', handleComplete, false);
  }

  function bindEvents() {

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

    console.log('Current company:', company);

    $searchPage.style.display = 'none';
    $resultPage.style.display = 'block';

    utils.emptyElement($result);
    utils.createElement('h1', $result, ['textContent', company.name]);

    utils.createElement('p', $result,
      ['textContent', 'Capital: ' + niceNumber(company.capital) + ' ' + (company.capital_curreny || 'EUR')]);

    if (company.parents != '') {

      var $parents = utils.createElement('div', $result);
      utils.createElement('h3', $parents, ['textContent', 'Shares held by']);
      var $parentsList = utils.createElement('ul', $parents);
      getRelatedCompanies(company.parents, renderParent);
    }

    if (company.children != '') {

      var $children = utils.createElement('div', $result);
      utils.createElement('h3', $children, ['textContent', 'Shareholder of']);
      var $childrenList = utils.createElement('ul', $children);
      getRelatedCompanies(company.children, renderChild);
    }

    function renderParent(parent) {

      var $parent = utils.createElement('li', $parentsList,
        ['textContent', parent.name],
        ['data-id', parent.id]);

      $parent.addEventListener('click', handleClick, false);
    }

    function renderChild(child) {

      var $child = utils.createElement('li', $childrenList,
        ['textContent', child.name],
        ['data-id', child.id]);

      $child.addEventListener('click', handleClick, false);
    }

    // @TODO Don't use innerHTML
    var $source = utils.createElement('p', $result);
    $source.innerHTML = 'Source: <a href="' + company.source_link + '">' + company.source + '</a>';
  }

  function handleClick(event) {


    // Extend event with company id
    event.text = {};
    event.text.value = event.target['data-id'];

    handleComplete(event);
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

    $search.value = '';
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
