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
            projectId: params.projectId,
            projectName: params.projectName,
            projectImg: params.projectImg
        });
        setTimeout(function () {
            callback(null, serverData);
        }, 10);
    },

     delete: function(req, resource, params, config, callback) {
        var projectToDelete = serverData.filter(function(p) {
            return p.projectId === parseInt(params.projectId);
        })[0];

        var indexToDelete;

        for (var i = 0; i < serverData.length; i++) {
            if (serverData[i].projectId === projectToDelete.projectId) {
                indexToDelete = i;
                break;
            }
        }

        serverData.splice(indexToDelete, 1);

        setTimeout(function () {
            callback(null, serverData);
        }, 10);
     }

     /*
     * Exercise!
     * - Add Edit project feature
     *
     * update: function(req, resource, params, body, config, callback) {},
     */

};