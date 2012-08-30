/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/29/12
 * Time: 8:11 PM
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('mongodb');
var db = new mongodb.Db('nodejitsudb995878414703',
    new mongodb.Server('alex.mongohq.com', 10043, {})
);
db.open(function (err, db_p) {
    if (err) { throw err; }
    db.authenticate('nodejitsu', 'f94a5d9583245726dcd4059166fcad5e', function (err, replies) {

    });
});
