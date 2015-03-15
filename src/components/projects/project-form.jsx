"use strict";

var React         = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var createProject = require('../../actions/create-project');

var ProjectForm = React.createClass({

    mixins: [FluxibleMixin],

    getInitialState: function() {
        /*
         * The form below uses a controlled ReactElement, which means the
         * input's value is set by the component's state.
         */

         //in a real app this flag should be elsewhere and passed into state/props
        var isClient = false;

        if(typeof window !== "undefined" && window !== null) {
            console.log('in client env');
            isClient = true;
        } else {
            console.log('in server env');
        }

        return {
            value: '',
            isClient: isClient
        };
    },

    submitForm: function (e) {
        e.preventDefault();

        /*
         * Exercise!
         * - Add form validation functionality and return (alert, etc.) an error
         */

        var formData = {
            projectName: this.state.value,
            projectImg: "http://placehold.it/546x408"
        };

        // Executes the createProject action and passes along the form data
        this.executeAction(createProject, formData);

        // Resets the form input
        this.setState({ value: '' });
    },

    /*
     * Called on every change to the form's controlled input and updates the
     * component's local state
     */
    handleChange: function(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
    },

    render: function () {



        //hardcoded img for now since the demo didn't have image uploading either
        var ancientForm = (
            <form action="/api?_csrf=a3fc2d&lang=en-US" method="POST">
                <input
                    ref="projectName"
                    placeholder="Add a project!"
                    name="projectName"
                    id="projectName"
                />
                <input
                    type="hidden"
                    ref="projectImg"
                    value="http://placehold.it/546x408"
                    name="projectImg"
                    id="projectImg"
                />
                <button
                    className="btn projectForm-button"
                    type="submit"> ADD
                </button>
            </form>
        );

        var modernForm = (
            <form onSubmit={this.submitForm}>
                <input
                    ref="projectName"
                    placeholder="Add a project!"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button
                    className="btn projectForm-button"
                    type="submit"> ADD
                </button>
            </form>
        );

        var form = (this.state.isClient === true) ? modernForm : ancientForm;

        return (
            <div className="row">
                <div className="col-sm-12">
                    {form}
                </div>
            </div>
        );
    }
});

module.exports = ProjectForm;
