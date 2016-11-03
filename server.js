'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Custom routes
var routes = require('./routes/index');

// Server setup
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Serve static content
app.use('/libs', express.static(path.join(__dirname, '/node_modules')));
app.use('/', express.static(path.join(__dirname, '/public')));

// Define routes
app.use('/', routes);

// Catch 404 errors
// Forwarded to the error handlers
app.use(function(req, res, next) {

  var err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {

    res.status(err.status || 500);

    res.render('error', {

      message: err.message,
      error: err
    });
  });
}

// Production error handler
// Does not display stacktrace to the user
app.use(function(err, req, res, next) {

  res.status(err.status || 500);

  res.render('error', {

    message: err.message,
    error: ''
  });
});

server.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
