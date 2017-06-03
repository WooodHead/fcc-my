

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

/* GET home page. */

router.get('/', homeController.index);


router.get('/nonprofit-project-instructions', function (req, res) {
  res.redirect(301, '/field-guide/how-do-free-code-camp\'s-nonprofit-projects-work');
});

router.post('/get-help', resourcesController.getHelp);

router.post('/get-pair', resourcesController.getPair);

router.get('/chat', resourcesController.chat);

router.get('/twitch', resourcesController.twitch);

router.get('/cats.json', function (req, res) {
  res.send(
    [
      {
        "name": "cute",
        "imageLink": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRaP1ecF2jerISkdhjr4R9yM9-8ClUy-TA36MnDiFBukd5IvEME0g"
      },
      {
        "name": "grumpy",
        "imageLink": "http://cdn.grumpycats.com/wp-content/uploads/2012/09/GC-Gravatar-copy.png"
      },
      {
        "name": "mischievous",
        "imageLink": "http://www.kittenspet.com/wp-content/uploads/2012/08/cat_with_funny_face_3-200x200.jpg"
      }
    ]
  )
});

// Agile Project Manager Onboarding

router.get('/pmi-acp-agile-project-managers',
  resourcesController.agileProjectManagers);

router.get('/agile', function (req, res) {
  res.redirect(301, '/pmi-acp-agile-project-managers');
});

router.get('/pmi-acp-agile-project-managers-form',
  resourcesController.agileProjectManagersForm);

// Nonprofit Onboarding

router.get('/nonprofits', resourcesController.nonprofits);

router.get('/nonprofits-form', resourcesController.nonprofitsForm);

router.get('/map',
  userController.userMigration,
  challengeMapController.challengeMap
);

router.get('/live-pair-programming', function (req, res) {
  res.redirect(301, '/field-guide/live-stream-pair-programming-on-twitch.tv');
});

router.get('/install-screenhero', function (req, res) {
  res.redirect(301, '/field-guide/install-screenhero');
});

router.get('/guide-to-our-nonprofit-projects', function (req, res) {
  res.redirect(301, '/field-guide/a-guide-to-our-nonprofit-projects');
});

router.get('/chromebook', function (req, res) {
  res.redirect(301, '/field-guide/chromebook');
});

router.get('/deploy-a-website', function (req, res) {
  res.redirect(301, '/field-guide/deploy-a-website');
});

router.get('/gmail-shortcuts', function (req, res) {
  res.redirect(301, '/field-guide/gmail-shortcuts');
});

router.get('/nodeschool-challenges', function (req, res) {
  res.redirect(301, '/field-guide/nodeschool-challenges');
});


router.get('/learn-to-code', challengeMapController.challengeMap);
router.get('/about', function (req, res) {
  res.redirect(301, '/map');
});
router.get('/signin', userController.getSignin);

router.get('/login', function (req, res) {
  res.redirect(301, '/signin');
});

router.post('/signin', userController.postSignin);

router.get('/signout', userController.signout);

router.get('/logout', function (req, res) {
  res.redirect(301, '/signout');
});

router.get('/forgot', userController.getForgot);

router.post('/forgot', userController.postForgot);

router.get('/reset/:token', userController.getReset);

router.post('/reset/:token', userController.postReset);

router.get('/email-signup', userController.getEmailSignup);

router.get('/email-signin', userController.getEmailSignin);

router.post('/email-signup', userController.postEmailSignup);

router.post('/email-signin', userController.postSignin);

/**
 * Nonprofit Project routes.
 */

router.get('/nonprofits/directory', nonprofitController.nonprofitsDirectory);

router.get(
  '/nonprofits/:nonprofitName',
  nonprofitController.returnIndividualNonprofit
);

router.get(
  '/jobs',
  jobsController.jobsDirectory
);

router.get(
  '/jobs-form',
  resourcesController.jobsForm
);

router.get('/privacy', function (req, res) {
  res.redirect(301, '/field-guide/what-is-the-free-code-camp-privacy-policy?');
});

router.get('/submit-cat-photo', resourcesController.catPhotoSubmit);


/**
 * Camper News routes.
 */
router.get(
  '/stories/hotStories',
  storyController.hotJSON
);

router.get(
  '/stories/recentStories',
  storyController.recentJSON
);

router.get(
  '/stories/comments/:id',
  storyController.comments
);

router.post(
  '/stories/comment/',
  storyController.commentSubmit
);

router.post(
  '/stories/comment/:id/comment',
  storyController.commentOnCommentSubmit
);

router.put(
  '/stories/comment/:id/edit',
  storyController.commentEdit
);

router.get(
  '/stories/submit',
  storyController.submitNew
);

router.get(
  '/stories/submit/new-story',
  storyController.preSubmit
);

router.post(
  '/stories/preliminary',
  storyController.newStory
);

router.post(
  '/stories/',
  storyController.storySubmission
);

router.get(
  '/news/',
  storyController.hot
);

router.post(
  '/stories/search',
  storyController.getStories
);

router.get(
  '/news/:storyName',
  storyController.returnIndividualStory
);

router.post(
  '/stories/upvote/',
  storyController.upvote
);

router.get(
  '/unsubscribe/:email',
  resourcesController.unsubscribe
);

router.get(
  '/unsubscribed',
  resourcesController.unsubscribed
);

router.all('/account', passportConf.isAuthenticated);

router.get('/account/api', userController.getAccountAngular);

/**
 * Field Guide related routes
 */
router.get('/field-guide/all-articles', fieldGuideController.showAllFieldGuides);

router.get('/field-guide/:fieldGuideName',
  fieldGuideController.returnIndividualFieldGuide
);

router.get('/field-guide/', fieldGuideController.returnNextFieldGuide);

router.post('/completed-field-guide/', fieldGuideController.completedFieldGuide);


/**
 * Challenge related routes
 */

router.get('/challenges/next-challenge',
  userController.userMigration,
  challengeController.returnNextChallenge
);

router.get(
  '/challenges/:challengeName',
  userController.userMigration,
  challengeController.returnIndividualChallenge
);

router.get('/challenges/',
  userController.userMigration,
  challengeController.returnCurrentChallenge);
// todo refactor these routes
router.post('/completed-challenge/', challengeController.completedChallenge);

router.post('/completed-zipline-or-basejump',
  challengeController.completedZiplineOrBasejump);

router.post('/completed-bonfire', challengeController.completedBonfire);



module.exports = router;
