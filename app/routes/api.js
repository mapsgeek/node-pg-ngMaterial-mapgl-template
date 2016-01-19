var express = require('express');
var router = express.Router();
var pg = require('../pg');


/*
 * Get list of all data
 */
//router.get('/data', function(req, res, next) {
//
//    // All columns in table with the exception of the geometry column
//    var nonGeomColumns = "id,name";
//
//    var sql = pg.featureCollectionSQL("table_name", nonGeomColumns);
//    var preparedStatement = {
//        name: "query_name",
//        text: sql,
//        values:[]};
//
//    pg.queryDeferred(preparedStatement)
//        .then(function(result){
//            res.send(JSON.stringify(result[0]));
//        })
//        .catch(function(err){
//            next(err);
//        });
//});


module.exports = router;



