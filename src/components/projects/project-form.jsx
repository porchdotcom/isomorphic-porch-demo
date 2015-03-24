"use strict";

var React         = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var createProject = require('../../actions/create-project');
var ProjectStore  = require('../../stores/project-store');

var ProjectForm = React.createClass({

    mixins: [FluxibleMixin],

    getInitialState: function() {
        /*
         * The form below uses a controlled ReactElement, which means the
         * input's value is set by the component's state.
         */
        return {
            value: ''
        };
    },

    submitForm: function (e) {
        e.preventDefault();

        /*
         * Exercise!
         * - Add form validation functionality and return (alert, etc.) an error
         */

        var formData = {
            projectId: this.getStore(ProjectStore).getNextId(),
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

        return (
            <div className="row">
                <div className="col-sm-12">

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
                </div>
            </div>
        );
    }
});

module.exports = ProjectForm;
