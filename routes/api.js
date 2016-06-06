var express = require('express');
var router = express.Router();
var pg = require('../pg');
var passportGithub = require('../auth/github');


router.get('/login', function(req, res, next) {
    res.send('Go back and register!');
});

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
    passportGithub.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication
        res.json(req.user);
    });


module.exports = router;



