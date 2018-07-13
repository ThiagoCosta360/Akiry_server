

var elasticsearch = require('elasticsearch');


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


client.ping({
  requestTimeout: 30000,

}, function (error) {
  if (error) {
    console.error('O cluster não foi conectado');
  } 
  else {
    console.log('Elastic search conectado com sucesso');
  }
  
});

module.exports = client;