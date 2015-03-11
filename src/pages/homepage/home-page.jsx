"use strict";

var React         = require('react/addons');
var FluxibleMixin = require('fluxible').Mixin;
var ProjectList   = require('../../components/projects/project-list');
var ProjectForm   = require('../../components/projects/project-form');
var Footer        = require('../../components/footer');

/*
 * Root application component, defined in src/app.js,
 * renders child components which is where the magic happens.
 */
var HomePage = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function() {
        return (
            <div className="homePage container">
                <div className="homePage-projects">
                    <h1>
                        Isomorphic Project Gallery
                        <span className="homePage-github">
                            <a href="https://github.com/porchdotcom/isomorphic-porch-demo">
                                View on GitHub
                            </a>
                        </span>
                    </h1>
                    <ProjectForm />
                    <ProjectList />
                </div>
                <Footer />
            </div>
        );
    }
});

module.exports = HomePage;
