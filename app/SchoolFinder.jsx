var React = require('react');
var reactDOM = require('react-dom');
var SchoolsList = require('./components/SchoolsList.jsx');

function render() {
  reactDOM.render(<SchoolsList />,document.getElementById('container'));
}

render();