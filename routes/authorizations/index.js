var passport = require('passport');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = function router(app) {
  app.get('/callback', passport.authenticate('auth0', {failureRedirect: '/'}), auth0Callback);
  app.get('/logout', logout);
  app.get('/isLogged', isLogged);
};

function auth0Callback(req, res) {
  if (!req.user) {
    throw new Error('User undefined!');
  }

  var user = {
    user_id: req.user.id,
    role: 'user'
  };

  Users.find({user_id: user.user_id}).lean().exec(function (err, users) {
    if (err) {
      console.log(err);
    }

    if (users.length) {
      req.user.userDbId = users[0]._id;
      res.redirect('/');

      return;
    }

    var User = new Users(user);

    User.save(function (err, user) {
      if (err) {
        console.log(err);
        return;
      }

      req.user.userDbId = user._id;
      res.redirect('/');
    });
  });
}

function logout(req, res) {
  req.logout();
  res.json({success: true, msg: [], data: true, error: null});
}

function isLogged(req, res) {
  var isUser = req.user ? true : false;

  res.json({success: true, msg: [], data: isUser, error: null});
}
