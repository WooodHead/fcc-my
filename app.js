
var express = require('express'),
  errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  path = require('path'),
  mongoose = require('mongoose');

var lessMiddleware = require('less-middleware');


var homeController = require('./controllers/home');


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



app.use(function (err, req, res, next) {
  res.send(err);
});

app.listen(app.get('port'), function () {
  console.log(
    'FreeCodeCamp server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

module.exports = app;
