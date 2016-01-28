module.exports = function(app) {
  require('./config.js')(app);
  require('./passport');
  require('./express.config')(app);
  require('./db')(app);
};
