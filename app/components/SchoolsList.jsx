var React = require('react');
var reactDOM = require('react-dom');
var AddSchool = require('./AddSchool.jsx');

var SchoolsList = React.createClass({
    render: function () {
        return (
            <div>
                <h1>test2</h1>
                <AddSchool />
            </div>
        );
    }
});

module.exports = SchoolsList;