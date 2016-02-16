var Controller = (function () {

    'use strict';

    function Controller() {

        this.hub = $.connection.mainHub;

        this.hub.client.renderDirectories = (directories, parent) => this.renderDirectories(directories, parent);
        this.hub.client.renderFiles = (files, parent) => this.renderFiles(files, parent);
        this.hub.client.renderDetails = (contents) => this.renderDetails(contents);

        var eventBinder = new EventBinder(this);
    }

    Controller.prototype.start = function () {

        $.connection.hub.start().done(
            () => { this.hub.server.init(); });

    };

    Controller.prototype.renderDirectories = function (directories, parent) {

        var renderer = new NavigationRenderer('directories', directories, parent);
        renderer.render();

    };

    Controller.prototype.renderFiles = function (files, parent) {

        var renderer = new NavigationRenderer('files', files, parent);
        renderer.render();

    };

    Controller.prototype.renderDetails = function (contents) {

        var renderer = new DetailsRenderer(contents);
        renderer.render();

    };

    Controller.prototype.navigate = function (targetDirectory) {

        this.hub.server.navigate(targetDirectory);

    };

    Controller.prototype.details = function (filePath) {

        this.hub.server.read(filePath);

    };

    return Controller;

})();