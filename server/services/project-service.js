'use strict';

var serverData = require('./data/project-data');

/*
 * Fetchr provides an abstraction which allows you to fetch data using the same
 * syntax on both server and client. For example, you can make a request using
 * node's request module on the server and use the same service service on the
 * client without having to write a separate AJAX request to the same endpoint.
 *
 * This example service demonstrates asynchronous service by reading and
 * writing to an array in a setTimeout call.
 */
module.exports = {

    // Actions use this name to call fetchr services
    name: 'projectService',

    /*
     * Fetchr requires CRUD interface names
     */
    read: function(req, resource, params, config, callback) {
        setTimeout(function () {
            callback(null, JSON.parse(JSON.stringify(serverData)));
        }, 10);
    }, 

    create: function(req, resource, params, body, config, callback) {
        serverData.unshift({
            projectName: params.projectName,
            projectImg: params.projectImg
        });
        setTimeout(function () {
            if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                //This seems like the most logical place to do a redirect if the form was not done with JS
                // However, without the res (response, not resource) object, I am not sure how to accomplish that
                callback(null, serverData);//placeholder
            } else {
                callback(null, serverData);
            }
        }, 10);
    }
    /*
     * Exercise!
     * - Add Delete project feature
     *
     * update: function(req, resource, params, body, config, callback) {},
     * delete: function(req, resource, params, config, callback) {}
     */
};