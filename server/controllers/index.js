var fs = require('fs');
var files = fs.readdirSync(__dirname);
var controllers = {};

/**
 * Dinamically load all controllers,
 * and exports them as an object.
 *
 * @param  {object} file
 * @return {undefined}
 */
files.forEach(function(file) {
    if (file !== 'index.js') {
        exports[file.slice(0, -3)] = require(__dirname + '/' + file);
    }
});
