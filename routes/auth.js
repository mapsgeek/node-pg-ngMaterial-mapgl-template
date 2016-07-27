var express = require('express');
var router = express.Router();
var passportGithub = require('../auth/github');
var jwtUtility = require('../auth/jwtUtility');


router.get('/user', function(req,res,next){
    if (req.isAuthenticated()) {
        jwtUtility.getToken(res, req.user)
    } else {
        res.redirect('/login');
        //res.status(401).json({error:"User unauthorized"})
    }
});

router.get('/auth/github',passportGithub.authenticate('github', {scope: ['user:email']}));

router.get('/auth/github/callback', passportGithub.authenticate('github', {failureRedirect: '/api/login', successFlash: 'Welcome!'}), function (req, res) {
    // Successful authentication
    res.redirect(req.session.returnTo || '/');
});


module.exports = router;



