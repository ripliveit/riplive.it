'use strict';

angular.module('riplive')

/**
 * Define a directive that handles
 * the drawings of the on air modal window.
 * Use PubSub through onAirChannel to publish the modal's status.
 *
 * @param  {Object} onAirChannel
 * @return {undefined}
 */
.directive('toggleOnAir', function(onAirChannel) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var open = false;

            var section = element.parent('#on-air');
            var viewPortHeight = document.documentElement.clientHeight;

            /**
             * Open the modal window.
             * Adjust the main container to the viewport height
             * to prevent user to scroll out.
             *
             * @return {undefined}
             */
            var openOnAir = function() {
                open = true;
                angular.element('div#main').height(viewPortHeight);

                section.removeClass('on-air-closed');
            };

            /**
             * Close the modal window.
             *
             * @return {undefined}
             */
            var closeOnAir = function() {
                open = false;
                angular.element('div#main').height('auto');

                section.addClass('on-air-closed');
            };

            /**
             * Subscribe to toggleOnAir event,
             * published by the interface controls in navbar.
             * Calls the according function, to open / close the
             * modal window.
             *
             * @param  {Object} e
             * @param  {boolean} data
             * @return {undefined}
             */
            onAirChannel.onToggleOnAir(scope, function(e, data) {
                if (open === false) {
                    openOnAir();
                } else {
                    closeOnAir();
                }

                // Publish the modal window status.
                onAirChannel.publish('onAirStatus', {status : 'ok', data : open});
            });
        }
    };
});