var Controller = (function () {

    'use strict';

    function Controller() {

        this.hub = $.connection.mainHub;

        this.hub.client.renderDirectories = (directories, parent) => this.renderDirectories(directories, parent);
        this.hub.client.renderFiles = (files, parent) => this.renderFiles(files, parent);
        this.hub.client.renderDetails = (contents) => this.renderDetails(contents);

        this.eventBinder = new EventBinder(this);
        this.detailsRenderer = new DetailsRenderer();
    }

    Controller.prototype.start = function () {

        $.connection.hub.start().done(
            () => { this.hub.server.init(); });

    };

    Controller.prototype.renderDirectories = function (directories, parent) {

        var renderer = new NavigationRenderer('directories', directories, parent);
        renderer.render();
        this.detailsRenderer.reset();

    };

    Controller.prototype.renderFiles = function (files, parent) {

        var renderer = new NavigationRenderer('files', files, parent);
        renderer.render();
        this.detailsRenderer.reset();

    };

    Controller.prototype.renderDetails = function (contents) {

        this.detailsRenderer.render(contents);
        this.eventBinder.closeNavigation();

    };

    Controller.prototype.navigate = function (targetDirectory) {

        this.hub.server.navigate(targetDirectory);

    };

    Controller.prototype.details = function (filePath) {

        this.hub.server.read(filePath);

    };

    return Controller;

})();