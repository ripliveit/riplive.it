var http = require('http');
var path = require('path');
var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');

var app = module.exports = express();
var logger = require(__dirname + '/server/services/logger.js');

// All environments
app.enable('trust proxy');
app.disable('x-powered-by');
app.disable('view cache');

app.set('port', process.env.PORT || 3000);
app.set('wp_uri', config.wp_uri);
app.set('admin_uri', config.admin_uri);
app.set('memcache_uri', config.memcache_uri);
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/server/views');
app.set('staticFolder', path.join(__dirname, config.static_folder));

if (process.env.NODE_ENV=== 'development') {
    app.use(morgan('dev')); 
}

app.use(require('prerender-node').set('prerenderToken', 'NfHYwNEeopnd3fYX7R8n'));
app.use(express.static(app.get('staticFolder')));
app.use(favicon(app.get('staticFolder') + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride());
app.use(cookieParser());

// Error Handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.send(500, {
        error: err
    });
});

var routes = require(__dirname + '/server/routes')(app);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Application server listening on port ' + app.get('port'));
});
