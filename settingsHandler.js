/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/30/12
 * Time: 7:07 PM
 * To change this template use File | Settings | File Templates.
 */
var url = require("url");
var instances = require('./mongo');
var decoder = require('./decoder');
var fs = require('fs');
var querystring = require('querystring');


var htmlPath = '/client/html/';
function handleSetDiabloUser(request, callback){
    if(!request.body){
        throw new Error('no data passed in settings');
    }
    var battleTag = request.body.battleTag;
    var battleName = request.body.battleName;
    var instanceString = request.body.instance;
    if(!battleName || !battleTag || !instanceString){
        throw new Error('no battle tag, battle name or instance');
    }
    var instanceObject = decoder.decodeInstance(instanceString);
    instances.updateEntry(instanceObject.instanceId, {
        'battleTag': battleTag,
        'battleName': battleName,
        'userId': instanceObject.uid
    }, function(){
        //loadSettings(instanceString, callback);
        callback('');
    });
}

function handleLoadSettings(request, callback){
    var query = url.parse(request.url).query;
    var instanceString = querystring.parse(query).instance;

    loadSettings(instanceString, callback);
}

function loadSettings(instanceString, callback){
    if(!instanceString){
        callback(loadHtmlContent());
        return;
    }
    var instanceObject = decoder.decodeInstance(instanceString);
    instances.getEntry(instanceObject.instanceId, function(item){
        var html = loadHtmlContent(item);
        callback(html);
    });
}

function loadHtmlContent(instanceEntry){
    var html = fs.readFileSync('.' + htmlPath + 'settings.html');
    if(instanceEntry){
        html = html.toString().replace('{battleTag}', instanceEntry.battleTag).
            replace('{battleName}', instanceEntry.battleName);
    }
    return html;
}

exports.handleSetDiabloUser = handleSetDiabloUser;
exports.handleLoadSettings = handleLoadSettings;