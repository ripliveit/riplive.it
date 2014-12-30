var request = require('request');

/**
 * A generic HTTP Service,
 * used to make GET and POST request to a remote server.
 * Use request library to perform the request.
 */
function HttpService() {

	/**
	 * Perform a GET request.
	 * 
	 * @param  {string}   uri The remote server's uri.
	 * @param  {Function} cb  A callback fired when all operations are done. 
	 * @return {undefined}       
	 */
    this.get = function(uri, cb) {
        request.get(uri, cb);
    };

    /**
     * Perform a POST request.
     * 
     * @param  {string}   uri  The remote server's uri.
     * @param  {object}   data The data to send.
     * @param  {Function} cb   A callback fired when all operations are done. 
     * @return {undefined}        
     */
    this.post = function(uri, data, cb) {
        var payLoad = {
            form: data || {}
        };

        request.post(uri, payLoad, cb);
    };
};

module.exports = new HttpService();
