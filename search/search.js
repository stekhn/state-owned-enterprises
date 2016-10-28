var search = (function () {

  var searchService = 'http://localhost:3001/search/';
  var companyService = 'http://localhost:3001/company/';

  var autocomplete;
  var $search, $searchPage, $result, $resultPage, $homeButton;

  document.addEventListener('DOMContentLoaded', init, false);

  function init() {

    $search = document.querySelector('.search');
    $searchPage = document.querySelector('.search-page');

    $result = document.querySelector('.result');
    $resultPage = document.querySelector('.result-page');

    $homeButton  = document.querySelector('.home-button');

    initAutocomplete();
    bindEvents();
  }

  function initAutocomplete() {

    autocomplete = new Awesomplete($search, {
      minChars: 1,
      maxItems: 7,
      autoFirst: true
    });

    $search.addEventListener('awesomplete-selectcomplete', handleComplete, false);
  }

  function bindEvents() {

    $search.addEventListener('keyup', handleSearch, false);
    $homeButton.addEventListener('click', openSearchPage, false);
  }

  function handleSearch(event) {

    // Ignore arrow key
    if (event.keyCode != 39 && event.keyCode != 40 &&
      event.keyCode != 41 && event.keyCode != 42) {

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

    // Clear result
    utils.emptyElement($result);

    if (company.capital != '') {

      utils.createElement('h1', $result, ['textContent', company.name]);
    }

    if (company.capital != '') {

      utils.createElement('p', $result,
        ['textContent', 'Capital: ' + nice(company.capital) + ' ' +
          (company.capital_curreny || 'EUR')]);
    }

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

    // Graph demo
    utils.createElement('h3', $result, ['textContent', 'Graph']);
    utils.createElement('img', $result, ['src', 'network.svg'], ['className', 'network']);

    if (company.source != '') {

      var $source = utils.createElement('p', $result, ['className', 'source']);

      // @TODO Don't use innerHTML
      $source.innerHTML = 'Source: <a href="' + company.source_link + '">' +
        company.source + ' (' + new Date(company.source_date).toLocaleDateString('en-US') + ')</a>';
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

  function nice(number) {

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return {

    init: init,
    search: search
  };
})();
