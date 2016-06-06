var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

//var User = require('../models/user');
var settings = require('../settings');
var init = require('./init');


passport.use(new GitHubStrategy({
        clientID: settings.github.clientID,
        clientSecret: settings.github.clientSecret,
        callbackURL: settings.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        var searchQuery = {
            name: profile.displayName
        };

        var updates = {
            name: profile.displayName,
            someID: profile.id
        };

        var options = {
            upsert: true
        };

        console.log('CooooL');

        // update the user if s/he exists or add a new user
        //User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        //    if(err) {
        //        return done(err);
        //    } else {
        //        return done(null, user);
        //    }
        //});
    }

));

// serialize user into the session
init();


module.exports = passport;