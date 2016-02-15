var Renderer = (function () {

    function Renderer($, type, collection) {

        this.$el = $('[data-collection="' + type + '"]');
        this.collection = collection;

    }

    Renderer.prototype.enumerate = function () {

        this.$el.find('[data-item]').remove();

        this.collection.forEach(function (item) {



        });

    };

    return Renderer();

})();