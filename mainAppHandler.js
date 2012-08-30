/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/30/12
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require("http");
var url = require("url");
var decoder = require('./decoder');
var instances = require('./mongo');
var fs = require('fs');
var querystring = require('querystring');

var htmlPath = '/client/html/';
function handleRequestForApp(request, callback){
    var query = url.parse(request.url).query;
    var instanceString = querystring.parse(query).instance;

    var instanceObject = decoder.decodeInstance(instanceString);
    instances.getEntry(instanceObject.instanceId, function(err, item){
        if(err){
            console.log('get item ' + instanceObject.instanceId + ' err: ' + err);
        }
        else {
            var html = loadHtmlContent(item);
            callback(html);
        }
    });

}

function loadHtmlContent(instanceEntry){
    var html = fs.readFileSync('.' + htmlPath + 'index.html');
    if(instanceEntry){
        html.replace('{d3UserId}', instanceEntry.userId);
    }
    return html;
}

exports.handleRequest = handleRequestForApp;
