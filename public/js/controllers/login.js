'use strict';

angular.module('riplive')

/**
 * Handle the authentication with Facebook strategy.
 * Every time a user try to login a he is redirected
 * to Facebook Login page. 
 * On completion 
 * 
 * @param {Object} $scope       
 * @param {Object} $routeParams 
 * @param {Object} $window      
 * @param {Object} userService  
 */
.controller('LoginCtrl', function LoginCtrl($scope, $routeParams, $window, userService) {
    /**
     * The server authentication's uri.
     * 
     * @type {String}
     */
    var uri = '/api/auth/facebook';
    
    /**
     * Check if the user is already logged in.
     */
    var alreadyLoggedIn = function() {
        $scope.success = true;
        $scope.message = 'You are already logged in.';
    };
    
    /**
     * Fired when user authentication is successfull.
     * @return {undefined} 
     */
    var success = function() {
        $scope.success = true;
        $scope.message = 'Thank you! You can now vote Riplive\'s charts.';
    };
    
    /**
     * Fired when user authentication is not successfull.
     * @return {undefined}
     */
    var failure = function() {
        $scope.failure = true;
        $scope.message = 'Cannot login. Please retry later.';
    };
    
    /**
     * Start the authentication process.
     * Open a pop up window to the server auth uri that handle the facebook authentication
     * When the server authentication is done the user is redirected to the child window,
     * with its uuid setted in query string.
     * 
     * @return {undefined} 
     */
    var auth = function() {
        var child = $window.open(uri, '_blank', 'resizable=yes, scrollbars=yes, titlebar=yes');

        child.addEventListener('message', function(message) {
            $scope.$apply(function() {
                if (message.data.status !== 'success') {
                    return failure();
                }
                success();
            });
        });
    };
    
    /**
     * If Login controller is invoked as a child window
     * the authentication is in process.
     * The user is redirected, after the facebook login auth,
     * to the child window.
     * The server set the uuid of the user in query string.
     * Uuid is used to retrieve user's information from the server;
     * data are saved in browser storage.
     * 
     */
    if ($window.opener && $routeParams.uuid) {
        $window.opener.focus();
        var uuid = $routeParams.uuid;

        userService.getUserByUuid(uuid, function(data) {
            if (data.status !== 'ok') {
                $window.parent.postMessage({
                    status: 'failure'
                }, '*');
                $window.close();
            }

            userService.persistUserToLocalStorage(data);
            $window.parent.postMessage({
                status: 'success'
            }, '*');
            $window.close();
        });
    }
    
    /**
     * Invoke the login process.
     * First check if the user is already logged in, queryng 
     * with userService the browser storage.
     * In the user in not present than start the auth process.
     * 
     * @return {undefined}
     */
    $scope.login = function() {
        var user = userService.getUserFromLocalStorage();

        if (!user) {
            auth();
        } else {
            alreadyLoggedIn();
        }
    };
});
