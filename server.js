/**
 * Created 1/19/2015.
 */
// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var session = require('express-session');
var settings = require('./settings');
var flash = require('express-flash');
var jwt = require('express-jwt');
var auth = require('./routes/auth');
var unless = require('express-unless');
jwt.unless = unless;


// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(session({secret: settings.auth.secret, resave: true, saveUninitialized: true, cookie: { maxAge: settings.auth.expiration }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Add headers
app.all('*',function (req, res, next) {

    // Websites to provide access to the API
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


if(settings.authentication === true) {
    app.use('/api', auth);

    app.use(jwt({
        secret: settings.auth.secret,
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    }).unless({
        path: [
            '/login',
            '/favicon.ico'
        ]
    }));

// catch JWT Authorization failures
    app.use(function (err, req, res, next) {
        if (typeof req.user !== "undefined" && new Date(req.session.cookie._expires) > new Date()) {
            console.log('Session has not expired');
            next();
        }
        else if (err && err.name === 'UnauthorizedError') {
            err.authenticated = false;
            res.redirect('/login');
        }
        else if (err) {
            res.status(err.status || 500).json({status: 'ERROR', errCode: err.status || 500, error: err});
        }
    });
}

// listen (start app with node server.js) ======================================
app.listen(settings.port || 4000);
console.log("App listening on port " + settings.port || 4000);

// application -------------------------------------------------------------
app.get('*',function(req,res){
    res.sendfile('./public/index.html');     // load angular index file
});

app = module.exports;