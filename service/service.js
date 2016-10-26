var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3001;
var router = express.Router();

var Company = require('./models/company');

mongoose.connect('mongodb://localhost:27017/stateo');

// Get company data
router.route('/company/:id').get(function (req, res) {

  var id = req.params.id;

  Company.find({ 'id': id }, function (error, company) {

    if (error) { res.send(error); }

    res.json(company);
  });
});

// Search companies and return a list of possible matches by substring
router.route('/search/:string').get(function (req, res) {

  var string = req.params.string;

  Company.find({ 'name': { '$regex': new RegExp('^' + string, 'i') } }, function (error, list) {

    if (error) { res.send(error); }

    list = list.map(function (company) {

      return company.name;
    });

    res.json(list);
  });
});

// Return empty array for empty searches
router.route('/search').get(function (req, res) {

  res.json([]);
});

router.get('/', function (req, res) {

  res.json({
    message: 'State-O database service is up and running.'
  });
});

// Allow Cross-origin request
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {

    res.send(200);
  } else {

    next();
  }
});

app.use('/', router);

app.listen(port);

console.log('Server is running on ' + port);
