'use strict';

var app      = require('./app');
var React    = require('react');
window.React = React; // for Chrome DevTools support

/*
 * Grab dehydrated application state from all stores.
 * Sent from the server
 */
var dehydratedState = window.App;

/*
 * Re-initialize application state and provides the request's
 * context object to the callback
 */
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context;
    var mountNode = document.getElementById('app');
    var Component = app.getComponent();

    /*
     * React will "render" the application component at the mountNode and
     * compare the results with the existing server-rendered DOM.
     * If everything matches, React will mount itself on top and attach
     * client-side event handlers.
     */
    React.render(
        Component({context: context.getComponentContext()}),
        mountNode,
        function () {
            console.log('React client-side rendered.');
        }
    );
});