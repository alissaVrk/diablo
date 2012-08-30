/**
 * Created with JetBrains WebStorm.
 * User: alissav
 * Date: 8/29/12
 * Time: 5:51 PM
 * To change this template use File | Settings | File Templates.
 */
var server = require("./server");
var router = require("./router");

server.start(router.route);

