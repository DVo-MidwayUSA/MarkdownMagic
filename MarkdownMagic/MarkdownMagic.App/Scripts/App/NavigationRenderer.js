var NavigationRenderer = (function () {

    'use strict';

    function NavigationRenderer(type, collection, parent) {

        this.$el = $(`[data-collection="${type}"]`);
        this.collection = collection;
        this.parent = parent;

    }

    NavigationRenderer.prototype.render = function () {

        this.$el.find('[data-collection-item]').remove();

        this.collection.forEach(
            (item) => { this.$el.prepend(NavigationRenderer.buildCollectionItemLink(item)); });

        this.buildParentLink();

    };

    NavigationRenderer.prototype.buildParentLink = function () {

        var $parentLink = $('[data-parent-link]');

        if (!this.parent)
        {
            $parentLink.hide();
            return;
        }

        $parentLink
            .attr('href', this.parent.FullPath)
            .text(`Back to ${this.parent.OriginalPath}`)
            .show();

    };

    NavigationRenderer.buildCollectionItemLink = function (item) {

        return `<li data-collection-item><a href="${item.FullPath}">${item.OriginalPath}</a></li>`;

    };

    return NavigationRenderer;

})();