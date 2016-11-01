'use strict';
var express = require('express');
var router = express.Router();

// GET: /
router.get('/', function(req, res) {

  res.render('index', {

    title: 'Search for state-owned enterprises'
  });
});

module.exports = router;
