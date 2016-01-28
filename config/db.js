var mongoose = require('mongoose');

module.exports = function (app) {
  var nconf = app.get('nconf');
  var mongoUri = nconf.get('MONGO_DB');

  var db = mongoose.connection;
  mongoose.connect(mongoUri);

  db.on('error', function (err) {
    console.log('db connect error', err);
  });

  db.once('open', function () {
    console.log('db connect good');
  });

  db.once('close', function () {
    console.log('db connect close');
  });
};
