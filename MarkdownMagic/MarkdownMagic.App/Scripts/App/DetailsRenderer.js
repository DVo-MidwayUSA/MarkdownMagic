var DetailsRenderer = (function () {

    'use strict';

    function DetailsRenderer(contents) {

        this.contents = contents;

    }

    DetailsRenderer.prototype.render = function () {

        $('[data-details]').html(this.translate());

    };

    DetailsRenderer.prototype.translate = function () {

        return marked(this.contents, { gfm: true });

    };

    return DetailsRenderer;

})();