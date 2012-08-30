
var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(route) {
    function onRequest(request, response) {
        parseRequest(request, function(request){
            var pathname = url.parse(request.url).pathname;
            console.log("Request for " + pathname + " received.");
            route(pathname, response, request);
        });
    }
    //http.createServer(onRequest).listen(80);
    http.createServer(onRequest).listen(3003);
    console.log("Server has started.");
}



function parseRequest(request, callback){
    if (request.method === 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            request.body = querystring.parse(body);
            callback(request);
        });
    }else{
        callback(request);
    }
}

exports.start = start;
