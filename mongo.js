/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/29/12
 * Time: 8:11 PM
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;


function addOrUpdate(instanceId, data, callback){
    getCollection(function(collection){
        data.instanceId = instanceId;
        collection.update({'instanceId': instanceId}, {$set: data}, {upsert: true, safe:true}, function(err, objects){
            if(err){
                console.log(err);
                throw new Error("couldn't update item " + instanceId + ' data ' + data + ' err: ' + err );
            }else{
                console.log('updated ' + objects);
                if(callback && typeof callback === 'function'){
                    callback(objects);
                }
            }
        });
    });
}

function getEntry(instanceId, callback){
    getCollection(function(collection){
        collection.findOne({'instanceId': instanceId}, function(err, item){
            if(err){
                console.log('get item ' + instanceId + ' err: ' + JSON.stringify(err));
                throw err;
            }
            callback(item);
        });
    });
}

var _collection = null;
function getCollection(callback){
    if(_collection){
        callback(_collection);
        return;
    }
    var db = new mongodb.Db('nodejitsudb995878414703',
        new mongodb.Server('alex.mongohq.com', 10043, {})
    );

    db.open(function (err, db_p) {
        if (err) {
            console.log(err);
            throw err;
        }
        db.authenticate('nodejitsu', 'f94a5d9583245726dcd4059166fcad5e', function (err, replies) {
            if(replies){
                db_p.collection('instances', function(err, collection){
                    if(err){
                        console.log(err);
                    }
                    _collection = collection;
                    callback(collection);
                });
            }
            else if(err){
                console.log('err ' + err);
            }
        });
    });
}

exports.updateEntry = addOrUpdate;
exports.getEntry = getEntry;