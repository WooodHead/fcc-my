var React = require('react');
var reactDOM = require('react-dom');
var actions = require('../actions/SchoolActions.js');

var AddSchool = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            tagline: ""
        };
    },
    addSchool: function (e) {
        e.preventDefault();
      
        actions.addSchool(this.state);
    },
    handleInputChange: function (e) {

        e.preventDefault();

        var n = e.target.name;

        var state = this.state;
        state[n] = e.target.value;

        this.setState(state);


    },

    render: function () {
        return (
            <form className='form' onSubmit={this.addSchool}>
                <div className='form-group'>
                    <label className='control-label' htmlFor='name' >School Name:</label>
                    <input className='form-control' type='text' id='name' name='name' placeholder='School Name' onChange={this.handleInputChange} />
                </div>
                <div className='form-group'>
                    <label className='control-label' htmlFor='tagline' >Tagline:</label>
                    <input className='form-control' type='text' id='tagline' name='tagline' placeholder='Tagline' onChange={this.handleInputChange} />
                </div>
                <button className='btn' type='submit'>Add School</button>
            </form>);
    }
});

module.exports = AddSchool;