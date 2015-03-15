'use strict';

require('node-jsx').install({extension: '.jsx', harmony: true}); // parses JSX and enables ES6/7 transpiling

var express        = require('express');
var bodyParser     = require('body-parser');
var isomorphicParser = require('./parsers/isomorphic-parser');
var path           = require('path');
var serialize      = require('serialize-javascript');
var React          = require('react');
var app            = require('../src/app'); // Fluxible app
var navigateAction = require('flux-router-component').navigateAction;
var HtmlComponent  = React.createFactory(require('../src/components/html-component.jsx'));

var server = express();
server.use('/v2/assets', express.static(path.join(__dirname, '..', 'dist')));

// Get access to the app's fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

var xhrPath = fetchrPlugin.getXhrPath();
server.use(xhrPath, bodyParser.json());
server.use(xhrPath, bodyParser.urlencoded({extended: true}));
server.use(xhrPath, isomorphicParser);

// Register our REST services with fetchr
fetchrPlugin.registerService(require('./services/project-service'));

// Set up the fetchr server middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

/*
 * The is the entrypoint into the Flux flow
 */
server.use(function(req, res) {

    /*
     * Create a request-scoped context to isolate data per request
     */
    var context = app.createContext({
        req: req, // pass the request object to fetchr
        xhrContext: { // query params for all fetchr XHR calls
            lang: 'en-US',
            _csrf: 'a3fc2d'
        }
    });

    /*
     * Fluxible has context interfaces for Action Creators, Components,
     * and Stores which provide access to Flux methods needed by each.
     *
     * Action Context provides dispatch, executeAction, and getStore
     */
    var actionContext = context.getActionContext();

    /*
     * navigateAction takes req.url and matches a route from src/routes.js,
     * executing the route object's action, if it exists. After the route's 
     * action, we continue in this function's callback.
     */
    actionContext.executeAction(navigateAction, {
        url: req.url
    }, function (err) {

        if (err) {
            res.status(500);
            res.send("five hundo. sad panda.");
            return;
        }

        /*
         * Exposing your app's server-rendered state so React can re-initialize
         * client-side on top of the existing DOM.
         *
         * Dispatchr provides dehydrate/rehydrayte functions that will serialize
         * data from all registered stores.
         *
         * We create a string variable to pass into the HtmlComponent below,
         * which will be rendered as JavaScript to create an App variable on
         * the global window object.
         */
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        // Application's root component defined in app.js
        var Component = app.getComponent();

        /*
         * Render our React application to basic HTML. This function adds
         * data-reactid attributes to each DOM node for the client to reconcile.
         *
         * Component Context provides access to getStore and executeAction and
         * is shared with all child components using React's built-in context
         * thanks to FluxibleMixin.
         *
         * The markup prop will contain the output from React rendering our
         * root app component.
         * 
         */
        var html = React.renderToStaticMarkup(HtmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(
                Component({ context: context.getComponentContext() })
            )
        }));

        // Render!
        res.send(html);
    });
});

// ok, run the server
var port = 8000;
server.listen(port, function() {
    var env = process.env.NODE_ENV || 'development';
    console.log('Listening on port ' + port + ' [' + env + ']');
});
