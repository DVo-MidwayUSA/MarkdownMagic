var Renderer = (function () {

    'use strict';

    function Renderer(type, collection, markdownMagic) {

        this.$el = $('[data-collection="' + type + '"]');
        this.type = type;
        this.collection = collection;
        this.markdownMagic = markdownMagic;

    }

    Renderer.prototype.enumerate = function () {

        var self = this;

        this.$el.find('[data-collection-item]').remove();

        this.collection.forEach(function (item) {

            self.$el.prepend(buildCollectionItem(item));

        });

        this.bind();

    };

    Renderer.prototype.bind = function () {

        var self = this,
            location;

        this.$el.find('a').click(function (e) {

            e.preventDefault();

            location = $(e.currentTarget).attr('href');

            if (self.type === 'file')
            {
                return;
            }

            self.markdownMagic.navigate(location);

        });

    };

    function buildCollectionItem(item) {

        var $link = $('<a />').attr('href', item.FullPath).text(item.OriginalPath),
            $listItem = $('<li data-collection-item />').append($link);

        return $listItem;

    }

    return Renderer;

})();