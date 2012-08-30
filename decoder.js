/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/30/12
 * Time: 4:04 PM
 * To change this template use File | Settings | File Templates.
 */
var string_decoder = require('string_decoder').StringDecoder;

exports.decodeInstance = function(instanceString){
    var parts = instanceString.split('.');
    var encodedJsonObject = new Buffer( parts[1], 'base64');
    var jsonObject = encodedJsonObject.toString('utf8');
    return JSON.parse(jsonObject);
}

