module.exports = function router(app) {
  require('./authorizations')(app);
  require('./todo')(app);
};
