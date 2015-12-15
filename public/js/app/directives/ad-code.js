'use strict';

angular.module('riplive')

/**
 * Show an AD.
 * 
 * @return {undefined}
 */
.directive('adCode', function adCode() {
    return {
        template: '<div class="adv-unit"></div>',
        replace: true,
        restrict: 'E',
        scope: {
            height: '=',
            width: '=',
            loc: '='
        },
        link: function postLink(scope, element, attrs) {
            var TDIframe = TDIframe || {
                counter: 0,
                newTDId: function() {
                    return 'TDId' + (this.counter += 1);
                }
            };

            TDIframe.url = 'http://anetit.tradedoubler.com/anet-' 
                            + Math.random().toString().substring(2, 11) 
                            + '?type(iframe)loc(' + scope.loc + ')';

            var adv = '<iframe id="' + TDIframe.newTDId() + '"'
                        + ' src="' + TDIframe.url + '"' 
                        + ' width="' + scope.width + '"'
                        + ' height="' + scope.height + '"' 
                        + ' frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no">'
                        + '</iframe>';

            element.html(adv);
        }
    };
});
