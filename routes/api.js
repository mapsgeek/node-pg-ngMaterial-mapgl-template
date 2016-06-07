var express = require('express');
var router = express.Router();
var passportGithub = require('../auth/github');
var passport = require('passport');

//var auth = function(req, res, next){
//    if (!req.isAuthenticated()) {
//        res.status(401).json({error:"Unauthorized"});
//    }
//    else {
//        next();
//    }
//};

router.get('/user', function(req,res,next){
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
    }
})

router.get('/auth/github',passportGithub.authenticate('github', {scope: ['user:email']}));

router.get('/auth/github/callback', passportGithub.authenticate('github', {failureRedirect: '/api/login', successFlash: 'Welcome!'}), function (req, res) {
    // Successful authentication
    //res.status(200).json(req.user);
    res.redirect(req.session.returnTo || '/');
});


module.exports = router;



