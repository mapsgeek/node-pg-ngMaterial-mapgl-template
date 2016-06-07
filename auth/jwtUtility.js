var jwtUtility = {};
var jwt = require('jsonwebtoken');
var settings = require('../settings')

jwtUtility.getToken = function (res, user){

    var jwtObj = {};

    var token = jwt.sign(jwtObj, settings.auth.secret, {
        expiresIn : settings.auth.expiration
    });

    jwtObj.token = token;
    jwtObj.user = user;

    res.set('Authorization', token)
        .set('Access-Control-Expose-Headers', 'Authorization')
        .json(jwtObj);

};

module.exports = jwtUtility;
