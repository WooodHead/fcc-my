var User = require('../models/user');
var passport = require('passport');
exports.getLogin = function (req, res) {
  res.render('account/login', { title: 'Login' });
};

exports.postLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user,function (err) {
      res.redirect(req.session.returnTo||'/');
    });
    
    

  });
};

exports.getSignup = function (req, res, next) {
  res.render('account/signup', { title: 'Signup' })
};

exports.postSignup = function (req, res, next) {
  console.log('postSignup');
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function (err) {
    if (err) return next(err);

    req.logIn(user, function (err) {
      if (err) return next(err);

      // res.redirect('/signup');
      res.redirect('/');
    });

  });

};

