var express = require('express');
var router = express.Router();
var Word = require('./../models/Word');
var React = require("react");
var testReact = require('../client/js/test.jsx');
var React = require('react');
var DOM = React.DOM;
var path = require('path');

var ServerDOM = require("react-dom/server");
var testReact = require('../client/js/test.jsx');


module.exports = function (req, res, next) {

  res.sendFile(path.join(__dirname, '../pagination/demo/index.html'));
};
