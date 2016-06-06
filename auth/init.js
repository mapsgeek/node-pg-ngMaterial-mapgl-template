var passport = require('passport');
//var User = require('../models/user');


module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // get user from DB?
        console.log(id);
        done(err, user);

        //User.findById(id, function (err, user) {
        //});
    });

};