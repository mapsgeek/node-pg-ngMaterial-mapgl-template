var jwtUtility = {};
var jwt = require('jsonwebtoken');

jwtUtility.getToken = function (res, user){

    var jwtObj = {};

    var token = jwt.sign(jwtObj, config.auth.secret, {
        expiresIn : config.auth.expiresIn
    });

    jwtObj.token = token;
    jwtObj.user = user;

    res.set('Authorization', token)
        .set('Access-Control-Expose-Headers', 'Authorization')
        .json(jwtObj);

};

router.exports = jwtUtility;
