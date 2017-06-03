var express = require('express');

var router = express.Router();

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

/**
 * API routes
 */

router.get('/api/github', resourcesController.githubCalls);

router.get('/api/blogger', resourcesController.bloggerCalls);

router.get('/api/trello', resourcesController.trelloCalls);

router.get('/api/codepen/twitter/:screenName', resourcesController.codepenResources.twitter);

// Unique Check API route
router.get('/api/checkUniqueUsername/:username',
  userController.checkUniqueUsername
);

router.get('/api/checkExistingUsername/:username',
  userController.checkExistingUsername
);

router.get('/api/checkUniqueEmail/:email', userController.checkUniqueEmail);

var Word = require('./../models/Word');

router.get('/api/words', function (req, res) {

  Word.find({}, function (err, words) {
    if (err) {
      return next(err);
    }
    res.json(words);

  });
});

module.exports = router;
