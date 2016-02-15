var MarkdownMagic = (function () {

    'use strict';

    function MarkdownMagic() {

        this.hub = $.connection.mainHub;

        this.init();

    }

    MarkdownMagic.prototype.init = function () {

        this.renderDirectories();
        this.renderFiles();
        this.renderParent();

    };

    MarkdownMagic.prototype.renderDirectories = function () {

        var self = this;

        this.hub.client.renderDirectories = function (directories) {

            var renderer = new Renderer('directory', directories, self);
            renderer.enumerate();

        };

    };

    MarkdownMagic.prototype.renderFiles = function () {

        var self = this;

        this.hub.client.renderFiles = function (files) {

            var renderer = new Renderer('file', files, self);
            renderer.enumerate();

        };

    };

    MarkdownMagic.prototype.renderParent = function () {

        var self = this;

        this.hub.client.renderParent = function (parent) {

            console.log('parent:', parent);

        };

    };

    MarkdownMagic.prototype.navigate = function (path) {

        this.hub.server.get(path);

    };

    MarkdownMagic.prototype.start = function () {

        var self = this;

        $.connection.hub.start().done(function () {

            self.hub.server.init();

        });

    };

    return MarkdownMagic;

})();