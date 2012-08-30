
var fs = require('fs');
var appRequestHandler = require('./mainAppHandler');

var htmlPath = '/client/html/';
var routingTable = {
    '/': function(response, request){
        appRequestHandler.handleRequest(request, loadHtmlString(response));
        return true;
    },
    '/settings': function(response, request){
        return loadFile(htmlPath + 'settings.html', response);
    }
};

var fileExtToType = {
    'html': {'type': 'text/html'},
    'css': {'type': 'text/css'},
    'js': {'type': 'text/javascript'},
    'jpg': {'type': 'image/jpeg', 'encoding': 'binary'},
    'png': {'type': 'image/png', 'encoding': 'binary'},
    'ico': {'type': 'image/x-icon', encoding: 'binary'}
};

function route(pathname, response, request){
    var success = false;
    if (typeof routingTable[pathname] === 'function') {
        success = routingTable[pathname](response, request);
    }
    else{
        success = loadFile(pathname, response);
    }
    if(!success){
        notFound(response, pathname);
    }
}

function loadFile(pathname, response){
    pathname = getCorrectRelativePath(pathname);
    var path = pathname.split('.');
    if(path.length < 2){
        console.log('not a legal file path ' + pathname);
        return false;
    }
    var ext = path[path.length - 1];
    if(!fs.existsSync('.' + pathname)){
        console.log("wrong path " + pathname);
        return false;
    }
    var file = fs.readFileSync('.' + pathname);
    var fileTypeMeta = fileExtToType[ext];
    if(!fileTypeMeta){
        console.log('no such file or wrong extension ' + pathname);
        return false;
    }
    response.writeHead(200, {'Content-Type': fileTypeMeta.type });
    response.end(file, fileTypeMeta.encoding);
    return true;
}

function loadHtmlString(response){
    return function(html){
        response.writeHead(200, {'Content-Type': 'text/html' });
        response.end(html);
    };
}

function getCorrectRelativePath(pathname){
    var correctPath = pathname;
    if(pathname.indexOf('~') >= 0){
        correctPath = pathname.split('~')[1];
    }
    return correctPath;
}

function notFound(response, pathname){
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.end("404 Not found");
}

exports.route = route;

