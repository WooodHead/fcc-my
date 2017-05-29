
var express = require('express'),
  errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  path = require('path'),
  mongoose = require('mongoose');

var lessMiddleware = require('less-middleware');
/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home'),

  secrets = require('./config/secrets'),
  passportConf = require('./config/passport');


var app = express();


// mongoose.connect(secrets.db);
// mongoose.connection.on('error', function () {
//   console.error(
//     'MongoDB Connection Error. Please make sure that MongoDB is running.'
//   );
// });


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lessMiddleware(__dirname + '/public',
  { render: { compress: false } }));
app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));


app.get('/', homeController.index);
/**
 * 500 Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler({ log: true }));
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

    var message = 'opps! Something went wrong. Please try again later';
    if (type === 'html') {
      req.flash('errors', { msg: message });
      return res.redirect('/');
      // json
    } else if (type === 'json') {
      res.setHeader('Content-Type', 'application/json');
      return res.send({ message: message });
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
