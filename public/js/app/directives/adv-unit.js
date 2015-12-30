'use strict';

angular.module('riplive')

/**
 * Show an ADV unit.
 * 
 * @return {undefined}
 */
.directive('advUnit', function adCode() {
    return {
        template: '<div class="adv-unit"></div>',
        replace: true,
        restrict: 'E',
        scope: {
            format: '@'
        },
        link: function postLink(scope, element, attrs) {
            var ads = {
                '300x250': {
                    width: 300,
                    height: 350,
                    uris: [
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=amazon_it&banner=1V2RBHACBX1Q1VCEAJR2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=it_dvd&banner=08M2AM5ZC1WWKCSVXW82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=fire_tablets&banner=1GA55H79M98VE0GYSHG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=it_generic&banner=1CMG6WCMHRWW9TZC7W82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=kindle&banner=1GX6C5B0A6J8FDQGH302&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=it_books&banner=0H5K1FHKA4Y7X545WC82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=mp3&banner=1H6NEGKY0M62VKM3G0R2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=computer&banner=1ZYB5QYD6B51EQ5XFTG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=prime&banner=1WBK148GAZFW63V0KD02&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=it_videogames&banner=1ZNP3FFQSDW1KY634P82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=12&l=ur1&category=libri_altre_lingue&banner=1REJ4SN451EJ410CRC02&f=ifr',
                    ]
                },
                '468x60': {
                    width: 468,
                    height: 60,
                    uris: [
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=amazon_it&banner=14MR2FNWX1R1ADQKE1R2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=buoni_regalo&banner=182W2KR50VX8DVQ6C702&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=it_dvd&banner=03GYP27QKDJJR9W8NCG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=it_electronics&banner=03VE9DPC009VND5ZY4G2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=fire_tablets&banner=0XD04CNWXV5M436KEWR2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=kindle&banner=046785QRGY1N97Z94RR2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=it_books&banner=1YV9F2KP47DG9QZ1VN02&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=mp3&banner=1HE0C7NNR8QFW92DA202&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=it_music&banner=1VW6X8390FPM9AQB5YG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=26&l=ur1&category=prime&banner=1N3HC4GD2DZPARKYEY82&f=ifr',
                    ]
                },
                '728x90': {
                    width: 728,
                    height: 90,
                    uris: [
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=amazon_it&banner=1DS02X4H3XQ0AYFT4WG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=it_dvd&banner=1TYFE6FXWWP2HR3VV9R2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=fire_tablets&banner=0Z5S6G9VXG2HAY4Y0G82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=it_generic&banner=1VE23Y2C8JA20QEKXQG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=kindle&banner=1R6G5M3QJ2WXEWVYGQ02&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=it_books&banner=02QNBD0JYHW7YVEM56G2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=mp3&banner=1PH02WDW9WZRZZEG5GG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=it_music&banner=0KNKKM01QFKP6N02Q202&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=computer&banner=12838Q6K8YW3SR02E9G2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=prime&banner=1T78Z23MDC0TKQ6ZFV82&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=it_videogames&banner=19Y39R78NQ9CWHF58MG2&f=ifr',
                        'http://rcm-eu.amazon-adsystem.com/e/cm?t=riplive-21&o=29&p=48&l=ur1&category=buoni_regalo&banner=0E8KY67SBDY5F63B91R2&f=ifr',
                    ]
                }
            };

            var getRandomFormat = function(format) {
                if (!ads.hasOwnProperty(format)) {
                    return '<!-- No adv format found -->';
                }

                var choosen = ads[format];
                var len = choosen.uris.length;
                var random = Math.floor(Math.random() * len);
                
                return   '<iframe' 
                        + ' src="' + choosen.uris[random] + '"'
                        + ' width="'  + choosen.width + '"'
                        + ' height="' + choosen.height + '"'
                        + ' scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>';
            };

            element.html(getRandomFormat(scope.format));
        }
    };
});
