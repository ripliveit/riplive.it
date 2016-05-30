let http = require('http');
let path = require('path');
let config = require('config');
let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let logger = require(__dirname + '/server/utils/logger.js');
let app = module.exports = express();

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
app.set('static_folder', path.join(__dirname, config.static_folder));

if (process.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}

app.use(require('prerender-node').set('prerenderToken', 'NfHYwNEeopnd3fYX7R8n'));
app.use(express.static(app.get('static_folder')));
app.use(favicon(app.get('static_folder') + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride());
app.use(cookieParser());

app.use((err, req, res) => {
    logger.error(err);
    res.send(500, {
        error: err
    });
});

let routes = require(__dirname + '/server/routes')(app);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Application server listening on port ' + app.get('port'));
});
