
var http = require("http");
var url = require("url");
var querystring = require('querystring');
var domain = require('domain');

var serverDomain = domain.create();

function start(route) {
    function onRequest(request, response) {
        var reqDomain = domain.create();
        reqDomain.add(request);
        reqDomain.add(response);
        reqDomain.on('error', function(err){
            try {
                response.writeHead(500, {'Content-Type': 'text/html' });
                response.end('<h3>Error occurred, sorry.</hr><p>'+ err.message + '</p>');
                response.on('close', function() {
                    // forcibly shut down any other things added to this domain
                    reqDomain.dispose();
                });
            } catch (er) {
                console.error('Error sending 500', er, request.url);
                // tried our best.  clean up anything remaining.
                reqDomain.dispose();
            }
        });


        reqDomain.run(function(){
            parseRequest(request, function(request){
                var pathname = url.parse(request.url).pathname;
                console.log("Request for " + pathname + " received.");
                route(pathname, response, request);

            });
        });
    }
    //http.createServer(onRequest).listen(80);
    http.createServer(onRequest).listen(3004);
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
