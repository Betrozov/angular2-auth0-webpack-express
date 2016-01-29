var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')({session: session});

module.exports = function (app) {
  var nconf = app.get('nconf');
  var mongoUri = nconf.get('MONGO_DB');
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    secret: 'keyboard cat',
    proxy: true,
    store: new MongoStore({
      url: mongoUri
    }),
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('public'));
};
