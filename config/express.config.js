var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function (app) {
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret: 'YOUR_SECRET_HERE', resave: false,  saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('public'));
};
