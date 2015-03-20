'use strict';

angular.module('riplive')

/**
 * Define a directive that handles the drawings
 * of the off canvas menu.
 * Use PubSub to publish the status of the menu through sideMenuChannel.
 * 
 * @param  {Object} sideMenuChannel
 * @return {undefined}                
 */
.directive('toggleSideMenu', function($location, sideMenuChannel) {
    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, element, attrs) {
            var open = false;
            var sideMenu = element;
            var wrapper = angular.element('#inner-wrapper');
            var links = element.find('.side-menu-link');
            var btn   = angular.element('.navbar-toggle');
           
            /**
             * Close the side menu applyng the correct
             * css classes.
             * Attach a click handler on #main div to click
             * the opened menu.
             * 
             * @return {undefined}
             */
            var openSideMenu = function() {
                open = true;

                wrapper.addClass('menu-open');

                sideMenu.removeClass('menu-closed')
                    .addClass('menu-open');

                btn.removeClass('fa-bars')
                    .addClass('fa-times');

                angular.element('#main').on('click', closeSideMenu);    
            };

            /**
             * Close the side menu applyng the correct
             * css classes.
             * Remove the click handler on #main div.
             * 
             * @return {undefined}
             */
            var closeSideMenu = function() {
                open = false;

                wrapper.removeClass('menu-open');

                sideMenu.removeClass('menu-open')
                    .addClass('menu-closed');

                btn.removeClass('fa-times')
                    .addClass('fa-bars');

                angular.element('#main').off('click', closeSideMenu);     
            };

            /**
             * Subscribe to toggleSideMenu event,
             * published by the interface controls in navbar.
             * Calls the according function, to open/close the side menu.
             *
             * @param  {Object} e
             * @param  {boolean} data
             * @return {undefined}
             */
            sideMenuChannel.onToggleSideMenu(scope, function(e, data) {
                if (open === false) {
                    openSideMenu();
                } else {
                    closeSideMenu();
                }

                // Publish the side menu status.
                sideMenuChannel.publish('sideMenuStatus', { status : 'ok', data : open });
            });

            links.on('click', closeSideMenu);
        }
    };
});