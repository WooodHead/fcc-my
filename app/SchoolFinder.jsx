var React = require('react');
var reactDOM = require('react-dom');
var SchoolsList = require('./components/SchoolsList.jsx');

var schoolsStore = require('./stores/schoolsStore.js');

var schools = schoolsStore.getSchools();

schoolsStore.onChange(function (_s) {
  schools = _s;
  console.log('_s',_s);
  render();
});

function render() {
  reactDOM.render(<SchoolsList schools={schools} />, document.getElementById('container'));
}

render();