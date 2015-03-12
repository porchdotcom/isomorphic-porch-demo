'use strict';
var React        = require('react');
var Fluxible     = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin  = require('fluxible-plugin-routr');

/*
 * Common application setup code.
 *
 * - Create new Fluxible app instance
 * - Define root application component
 * - Install plugins
 * - Register stores
 */

var app = new Fluxible({
  component: React.createFactory(require('./pages/homepage/home-page'))
});

app.plug(fetchrPlugin({
  xhrPath: '/api/' // all client-side XHR requests come through this endpoint
}));

app.plug(routrPlugin({ routes: require('./routes') }));

app.registerStore(require('../src/stores/project-store'));

module.exports = app;
