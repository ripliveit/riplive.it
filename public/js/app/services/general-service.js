'use strict';

angular.module('riplive')

/**
 * Implements helper methods used
 * by clients to manipulate data.
 *
 * @return {Object}
 */
.service('generalService', function generalService($injector) {

    /**
     * Fill an array with all items from
     * another array.
     *
     * @param  {Array} items  Array which items will be pushed.
     * @param  {Array} toFill Array which will be filled.
     * @return {undefined}
     */
    var pushToArray = function(items, toFill) {
        if (!(toFill instanceof Array)) {
            throw new Error('Pleas specify an array to be filled');
        }

        for (var i = 0, length = items.length; i < length; i++) {
            toFill.push(items[i]);
        }
    };

    /**
     * Fill an array with all items from
     * another array.
     * Divide the final array by alphabetical letters.
     *
     * @param  {Array} items  Array which items will be pushed.
     * @param  {Array} toFill Array which will be filled.
     * @return {undefined}
     */
    var pushToLetters = function(items, toFill) {
        for (var letter in items) {
            if (!(toFill[letter] instanceof Array)) {
                toFill[letter] = [];
            }

            for (var i = 0; i < items[letter].length; i++) {
                toFill[letter].push(items[letter][i]);
            }
        }
    };

    var fillWithAdv = function(arr, every) {
        if (!(arr instanceof Array)) {
            throw new Error('Pleas specify an array to be filled');
        }

        arr.map(function(item, i) {
            if (i % every === 0 && i !== 0) {
                arr.splice(i, 0, { adv: true});
            }

            return item;
        });

        return arr;
    };
    
    var getAcmeGeoData = function(cb) {
        var geo = $injector.get('geo');
        var resource = geo.get();

        resource.$promise.then(function(data) {
            cb(data.geo);
        });
    };

    /**
     * Return an object that
     * implements the methods.
     */
    return {
        pushToArray: pushToArray,
        pushToLetters: pushToLetters,
        fillWithAdv: fillWithAdv,
        getAcmeGeoData: getAcmeGeoData
    };
});
