'use strict';

module.exports = function (context, payload, done) {

    /*
     * Calls the service's delete function and passes in the projectId to delete. This service
     * returns all projects after the deletion.
     */
    context.service.delete('projectService', payload, {}, function(err, projects) {
        if (err) {
            console.error(err);
            done(err);
            return;
        }

        /*
         * Dispatches the same event as the server's load action,
         * passing along an updated list of projects to all stores registered
         * to handle this event.
         */
        context.dispatch('RECEIVE_PROJECTS_SUCCESS', projects);
        done();
    });

};
