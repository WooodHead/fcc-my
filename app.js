require('dotenv').load();
// handle uncaught exceptions. Forever will restart process on shutdown
process.on('uncaughtException', function (err) {
  console.error(
    (new Date()).toUTCString() + ' uncaughtException:',
    err.message
  );
  console.error(err.stack);
  /* eslint-disable no-process-exit */
  process.exit(1);
  /* eslint-enable no-process-exit */
});

var express = require('express'),
  accepts = require('accepts'),
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
  homeController = require('./controllers/home'),
  resourcesController = require('./controllers/resources'),
  userController = require('./controllers/user'),
  nonprofitController = require('./controllers/nonprofits'),
  fieldGuideController = require('./controllers/fieldGuide'),
  challengeMapController = require('./controllers/challengeMap'),
  challengeController = require('./controllers/challenge'),
  jobsController = require('./controllers/jobs'),

  /**
   *  Stories
   */
  storyController = require('./controllers/story'),

  /**
   * API keys and Passport configuration.
   */
  secrets = require('./config/secrets'),
  passportConf = require('./config/passport');

var indexRoutes = require('./routes/index');
var wordsRoutes = require('./routes/words');
var accountRoutes = require('./routes/account');
var apiRoutes = require('./routes/api');

var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function () {
  console.error(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  );
});

/**
 * Express configuration.
 */


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(compress());
app.use(lessMiddleware(__dirname + '/public', {
  compress: false
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator({
  customValidators: {
    matchRegex: function (param, regex) {
      return regex.test(param);
    }
  }
}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    'autoReconnect': true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.disable('x-powered-by');

app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.use(function (req, res, next) {
  // Make user object available in templates.
  res.locals.user = req.user;
  next();
});

app.use(express.static(__dirname + '/public', {
  maxAge: 86400000
}));
// app.use(express.static(__dirname + '/pagination/demo', { maxAge: 86400000 }));

app.use(function (req, res, next) {
  // Remember original destination before login.
  var path = req.path.split('/')[1];
  if (/auth|login|logout|signin|signup|fonts|favicon/i.test(path)) {
    return next();
  } else if (/\/stories\/comments\/\w+/i.test(req.path)) {
    return next();
  }
  req.session.returnTo = req.path;
  next();
});

/**
 * Main routes.
 */
app.use('/', indexRoutes);
app.use('/words', wordsRoutes);
app.use('/account', accountRoutes);

app.use('/', apiRoutes);


app.get('/schoolfinder', function (req, res) {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.get('/dataTable', function (req, res) {
  res.render('dataTable');
});

// put this route last
app.get(
  '/:username',
  userController.returnUser
);





/**
 * 500 Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler({
    log: true
  }));
} else {
  // error handling in production
  app.use(function (err, req, res, next) {

    // respect err.status
    if (err.status) {
      res.statusCode = err.status;
    }

    // default status code to 500
    if (res.statusCode < 400) {
      res.statusCode = 500;
    }

    // parse res type
    var accept = accepts(req);
    var type = accept.type('html', 'json', 'text');

    var message = 'opps! Something went wrong. Please try again later';
    if (type === 'html') {
      req.flash('errors', {
        msg: message
      });
      return res.redirect('/');
      // json
    } else if (type === 'json') {
      res.setHeader('Content-Type', 'application/json');
      return res.send({
        message: message
      });
      // plain text
    } else {
      res.setHeader('Content-Type', 'text/plain');
      return res.send(message);
    }
  });
}

/**
 * Start Express server.
 */

app.listen(app.get('port'), function () {
  console.log(
    'FreeCodeCamp server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

module.exports = app;
