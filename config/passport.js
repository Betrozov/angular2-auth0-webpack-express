var path = require('path');
var nconf = require('nconf');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

nconf
  .argv()
  .env()
  .file(path.join(__dirname, '/env/config.json'));

var auth0Config = {
  domain: nconf.get('auth0.domain'),
  clientID: nconf.get('auth0.clientID'),
  clientSecret: nconf.get('auth0.clientSecret')
};

var strategy = new Auth0Strategy({
  domain: auth0Config.domain,
  clientID: auth0Config.clientID,
  clientSecret: auth0Config.clientSecret,
  callbackURL: '/callback'
}, function (accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
});

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
