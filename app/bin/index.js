

var server = require('../src/server');
var debug = require('debug')('nodestr:server');

//Variável para alterar a porta de execução do servidor.
var port = 8080



server.listen(port, () =>{
	console.log('%s está online em %s',server.name, server.url);
	console.log("Para derrubar o servidor: ctrl + c");
});
server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
