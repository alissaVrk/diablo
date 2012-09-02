/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/31/12
 * Time: 7:10 PM
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");
var url = require("url");
var decoder = require('./decoder');
var instances = require('./mongo');
var fs = require('fs');
var querystring = require('querystring');

var htmlPath = '/client/html/';
var defaultBattleData = {
    'battleTag': 'Alexandra-2631',
//    'battleName': 'chapaev',
    'userId': null
};


function handleRequestForApp(request, callback){
    getBattleDataFromQuery(request, function(battleData){
        callback(loadHtmlContent(battleData, 'index.html'));
    });
}

function handleLoadSettings(request, callback){
    getBattleDataFromQuery(request, function(battleData){
        callback(loadHtmlContent(battleData, 'settings.html'));
    });
}

function handleSetDiabloUser(request, callback){
    var battleData = getBattleDataFromPost(request);
    instances.updateEntry(battleData.instanceId, battleData, function(){
        callback();
    } );
}

function getBattleDataFromQuery(request, callback){
    var query = url.parse(request.url).query;
    var instanceString = querystring.parse(query).instance;

    if(!instanceString){
        callback();
        return;
    }
    var instanceObject = decoder.decodeInstance(instanceString);
    instances.getEntry(instanceObject.instanceId, callback);
}

function getBattleDataFromPost(request){
    if(!request.body){
        throw new Error('no data passed in settings');
    }
    var battleData = {
        'battleTag': request.body.battleTag
        //'battleName': request.body.battleName
    };
    var instanceString = request.body.instance;
    if(!battleData.battleTag || !instanceString){
        throw new Error('no battle tag, battle name or instance');
    }
    var instanceObject = decoder.decodeInstance(instanceString);
    battleData.userId = instanceObject.uid;
    battleData.instanceId = instanceObject.instanceId;
    return battleData;
}

function loadHtmlContent(instanceEntry, fileName){
    var html = fs.readFileSync('.' + htmlPath + fileName);
    var replaceWith = instanceEntry || defaultBattleData;
    html = html.toString().replace('{battleObject}', JSON.stringify(replaceWith));
    return html;
}

exports.handleSetDiabloUser = handleSetDiabloUser;
exports.handleLoadSettings = handleLoadSettings;
exports.handleRequestForApp = handleRequestForApp;
