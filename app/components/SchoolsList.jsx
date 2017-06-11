var React = require('react');
var reactDOM = require('react-dom');

var AddSchool = require('./AddSchool.jsx');

var SchoolInfo = require('./SchoolInfo.jsx');

var SchoolsList = React.createClass({
    render: function () {
        return (
            <div className='row'>
                <div className='col-md-6'>
                    <AddSchool />
                </div>
                <div className='col-md-6'>
                    {
                        this.props.schools.map(function (val, index) {
                            return (
                                <SchoolInfo info={val} key={'school' + index} />
                            );
                        })

                    }
                </div>
            </div >
        );
    }
});

module.exports = SchoolsList;