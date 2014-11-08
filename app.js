var monitor = require('newrelic');
var passport = require('passport');
var express = require('express');
var http = require('http');
var path = require('path');
var app = module.exports = express();
var logger = require(__dirname + '/lib/services/logger.js');
var store = require('connect-memcached')(express);

// All environments
app.enable('trust proxy');
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);

// Development
// configuration.
app.configure('development', function() {
    app.set('wp_uri', 'http://www.static.riplive.it/api');
    app.set('admin_uri', 'http://www.static.riplive.it/wp-admin/admin-ajax.php');
    //app.set('wp_uri', 'http://riplive.local/api');
    //app.set('admin_uri', 'http://riplive.local/wp-admin/admin-ajax.php');
    app.set('memcache_uri', '127.0.0.1:11211');
    app.set('staticFolder', path.join(__dirname, 'app'));

    app.use(express.errorHandler());
    app.use(express.logger('dev'));
    app.use(express.static(app.get('staticFolder')));
});

// Production 
// configuration.
app.configure('production', function() {
    app.set('wp_uri', 'http://www.static.riplive.it/api');
    app.set('admin_uri', 'http://www.static.riplive.it/wp-admin/admin-ajax.php');
    app.set('memcache_uri', '188.226.129.103:11211');
    app.set('staticFolder', path.join(__dirname, 'dist'));

    app.use(express.static(app.get('staticFolder')));
});

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: '0N.RgHJAh7VI',
    store: new store({
        hosts: [app.get('memcache_uri')] 
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
    logger.error(err);
    res.send(500, {
        error: err
    });
});

var routes = require(__dirname + '/lib/routes')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Application server listening on port ' + app.get('port'));
});
