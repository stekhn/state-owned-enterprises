'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Data model
var Company = require('../models/company');

// Database config
mongoose.connect('mongodb://localhost:27017/stateo');

router.route('/company/:id').get(function (req, res) {

  var id = req.params.id;

  Company.find({ 'id': id }, function (error, company) {

    // @TODO Render error
    if (error) { res.send(error); }

    res.render('company', company[0]);
  });
});

router.get('/', function(req, res) {

  res.render('index', {

    title: 'Search for state-owned enterprises'
  });
});

module.exports = router;
