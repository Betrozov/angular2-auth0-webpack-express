var path = require('path');
var nconf = require('nconf');

module.exports = function (app) {
  nconf.argv().env().file(path.join(__dirname, '/env/config.json'));

  app.set('nconf', nconf);
};
