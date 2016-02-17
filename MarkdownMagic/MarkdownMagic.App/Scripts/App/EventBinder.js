var EventBinder = (function () {

    'use strict';

    function EventBinder(controller) {

        this.controller = controller;

        this.bindDirectoryLinks();
        this.bindFileLinks();
        this.bindParentLinks();

    }

    EventBinder.prototype.bindDirectoryLinks = function () {

        $('[data-collection="directories"] a')
            .live('click', (e) => this.navigate(e));

    };

    EventBinder.prototype.bindParentLinks = function () {

        $('[data-parent-link]')
            .live('click', (e) => this.navigate(e));

    };

    EventBinder.prototype.bindFileLinks = function () {

        $('[data-collection="files"] a')
            .live('click', (e) => this.details(e));

    };

    EventBinder.prototype.navigate = function (e) {

        e.preventDefault();

        var targetDirectory = $(e.currentTarget).attr('href');
        this.controller.navigate(targetDirectory);

        $('[data-details]').empty();

    };

    EventBinder.prototype.details = function (e) {

        e.preventDefault();

        var $currentTarget = $(e.currentTarget),
            filePath = $currentTarget.attr('href');

        EventBinder.toggleSelection($currentTarget);

        this.controller.details(filePath);

    };

    EventBinder.prototype.closeNavigation = function () {

        $('[data-nav-trigger]').attr('checked', false);

    };

    EventBinder.toggleSelection = function ($currentTarget) {

        $currentTarget.addClass('selected');

        $('[data-collection="files"] li a')
            .not($currentTarget)
            .removeClass('selected');

    };

    return EventBinder;

})();