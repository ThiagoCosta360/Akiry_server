var restify = require('restify');
var routes = require('./routes');
var client = require('./elastic');

//Servidor Restify
var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());


routes(server)
module.exports = server;