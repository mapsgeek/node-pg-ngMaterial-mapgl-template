var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

//var User = require('../models/user');
var settings = require('../settings');
var init = require('./init');


passport.use(new GitHubStrategy({
        clientID: settings.github.clientID,
        clientSecret: settings.github.clientSecret,
        callbackURL: settings.github.callbackURL,
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {

        console.log('GitHub login complete.');
        req.flash('info', { msg: 'GitHub account has been linked.' });
        done(null, profile);
    }

));

// serialize user into the session
init();


module.exports = passport;