var monitor = require('newrelic');
var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var app = module.exports = express();
var logger = require(__dirname + '/server/services/logger.js');

console.log(config);

// All environments
app.enable('trust proxy');
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('wp_uri', config.wp_uri);
app.set('admin_uri', config.admin_uri);
app.set('memcache_uri', config.memcache_uri);
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/server/views');
app.set('staticFolder', path.join(__dirname, config.static_folder));

// Development
// configuration.
app.configure('development', function() {
    //app.use(express.errorHandler());
    //app.use(express.logger('dev'));
});

app.use(express.static(app.get('staticFolder')));
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);

// Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
    logger.error(err);
    res.send(500, {
        error: err
    });
});

var routes = require(__dirname + '/server/routes')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Application server listening on port ' + app.get('port'));
});
