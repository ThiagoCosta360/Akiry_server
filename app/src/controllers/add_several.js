

var client = require('../elastic');

var bulk = [];
var counter = 1;


/*
	
	Função que agrupa cada elemento do array recebido 
	com outro objeto para que assim possa ser inserido
	no servidor pelo método bulk.

*/

var make_bulk = function(movie_list,callback){
	for (var current in movie_list){
		bulk.push(
			{ index: {_index: 'index', _type: 'movies', _id: counter } },
			{
				'id' : counter,
				'title' : movie_list[current].title,
				'year' : movie_list[current].year,
				'genre' : movie_list[current].genre
			}
		);
		counter++;
	}
	callback(bulk);
}


/*

	Função que indexa a variável make_bulk no 
	elasticsearch pelo método bulk

*/

var index_all = function(made_bulk,callback){
	client.bulk({
		maxRetries: 5,
		index: 'example_index',
		type: 'movies',
		body : made_bulk
	},function(err,resp,status){
		if(err){
			console.log(err);
		}
		else {
			callback(resp.itens);
		}
	})
}


/*

	Variável utilizada em routes.js (20) 
	para indexar o request_body da rota.

*/

var made_bulk = function(inputfile){
	make_bulk(inputfile,function(response){
		console.log("Conteudo em massa preparado");

	index_all(response,function(response){
		console.log(response);

	})
});
}
module.exports = made_bulk;