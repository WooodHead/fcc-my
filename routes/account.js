

var express = require('express');

var routor = express.Router();

var accepts = require('accepts'),
  cookieParser = require('cookie-parser'),
  compress = require('compression'),
  session = require('express-session'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  frameguard = require('frameguard'),
  csp = require('helmet-csp'),
  MongoStore = require('connect-mongo')(session),
  flash = require('express-flash'),
  path = require('path'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  expressValidator = require('express-validator'),
  request = require('request'),
  forceDomain = require('forcedomain'),
  lessMiddleware = require('less-middleware'),

  /**
   * Controllers (route handlers).
   */
  homeController = require('../controllers/home'),
  resourcesController = require('../controllers/resources'),
  userController = require('../controllers/user'),
  nonprofitController = require('../controllers/nonprofits'),
  fieldGuideController = require('../controllers/fieldGuide'),
  challengeMapController = require('../controllers/challengeMap'),
  challengeController = require('../controllers/challenge'),
  jobsController = require('../controllers/jobs'),

  /**
   *  Stories
   */
  storyController = require('../controllers/story'),

  /**
   * API keys and Passport configuration.
   */
  secrets = require('../config/secrets'),
  passportConf = require('../config/passport');


routor.get('/', userController.getAccount);

routor.post('/profile', userController.postUpdateProfile);

routor.post('/password', userController.postUpdatePassword);

routor.post('/delete', userController.postDeleteAccount);

routor.get('/unlink/:provider', userController.getOauthUnlink);

// routor.get('/sitemap.xml', resourcesController.sitemap);

/**
 * OAuth sign-in routes.
 */

var passportOptions = {
  successRedirect: '/',
  failureRedirect: '/login'
};


// // put this route last
// routor.get(
//   '/:username',
//   userController.returnUser
// );


module.exports = routor;
