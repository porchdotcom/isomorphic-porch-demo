'use strict';

var createStore = require('fluxible/utils/createStore');

var ProjectStore = createStore({
    storeName: "ProjectStore",

    /*
     * Whenever one of these events is dispatched from an action, handle it with
     * the corresponding function. Note: multiple stores can listen to the same
     * event, and Fluxible provides a waitFor function to handle inter-store
     * dependencies.
     */
    handlers: {
        'RECEIVE_PROJECTS_SUCCESS': 'updateProjects'
    },

    initialize: function () {
        this.projects = [];
        this.nextId = 4;
    },

    getProjects: function () {
        return this.projects;
    },

    getNextId: function () {
        return this.nextId;
    },

    /*
     * Update the store's internal state with the payload from an action.
     *
     * Flux magic!
     * this.emitChange() will send a change event to all components who are
     * listening for updates from this particular store. When a subscribed
     * component hears this emitted change, it will trigger a re-render and
     * React happiness follows.
     */
    updateProjects: function (payload) {
        this.projects = payload;
        this.nextId++;
        this.emitChange();
    },

    /*
     * Dehydrate/rehydrate used to share store's state from server to client.
     * More explanation in server/index
     */
    dehydrate: function () {
        return {
            projects: this.projects
        };
    },
    rehydrate: function (state) {
        this.projects = state.projects;
    }
});

module.exports = ProjectStore;
