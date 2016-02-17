var DetailsRenderer = (function () {

    'use strict';

    function DetailsRenderer() {

        this.$el = $('[data-details]');

    }

    DetailsRenderer.prototype.render = function (contents) {

        this.$el.html(DetailsRenderer.translate(contents));

    };

    DetailsRenderer.prototype.reset = function () {

        this.$el.html(DetailsRenderer.translate(`*Choose a file to view it's contents...*`));

    };

    DetailsRenderer.translate = function (contents) {

        return marked(contents, { gfm: true });

    };

    return DetailsRenderer;

})();