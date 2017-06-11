var React = require('react');
var reactDOM = require('react-dom');


var SchoolInfo = React.createClass({
    deleteSchool: function () {
        
    },
    render: function () {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    {this.props.info.name}
                    <span className='pull-right text-uppercase delete-button' onClick={this.deleteSchool}>&times;</span>
                </div>
                <div className='panel-body'> {this.props.info.tagline}</div>

            </div>
        );
    }
});

module.exports = SchoolInfo;