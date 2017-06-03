var express = require('express');
var router = express.Router();
var Word = require('./../models/Word');
var React = require("react");
var testReact = require('../client/js/test.jsx');
var React = require('react');
var DOM = React.DOM;

var ServerDOM = require("react-dom/server");
var testReact = require('../client/js/test.jsx');


// router.get("/", function (req,res,next) {

//     const html = ServerDOM.renderToStaticMarkup(React.createElement(Html));
//     res.status(200).send("<!doctype html>" + html);
// });

router.get('/', function (req, res, next) {
  // var html = ServerDOM.renderToStaticMarkup(React.createElement(testReact));
  // res.status(200).send("<!doctype html>" + html);

  Word.find({}, function (err, words) {
    if (err) { return next(err); }

    res.render('words/learn', {
      words: words
    });

  });

  // res.render('words/learn', { activeTab: 'learn' });
});

router.get('/learn', function (req, res, next) {
  res.render('words/learn', { activeTab: 'learn' });
});


router.get('/extension', function (req, res, next) {
  res.render('words/extension', { activeTab: 'extension' });
});

router.get('/books', function (req, res, next) {
  res.render('words/books', { activeTab: 'books' });
});

router.get('/library', function (req, res, next) {
  res.render('words/library', { activeTab: 'library' });
});

router.get('/test', function (req, res, next) {
  res.render('words/test', { activeTab: 'test' });

});


router.get('/settings', function (req, res, next) {
  res.render('words/settings', { activeTab: 'settings' });
});



module.exports = router;