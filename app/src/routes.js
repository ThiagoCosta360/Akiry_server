var client = require('./elastic');

//Funções das Rotas Desafio separadas em dois controllers:
var made_bulk = require('./controllers/add_several');
var search = require('./controllers/search');


/*
	
	Funções auxiliares de cada rota
	utilizadas apenas para melhorar 
	a visualização.

*/

function add_several(req, res, next) {
	res.send('Indexado com sucesso');
	made_bulk(req.body);

	next();
}

function test(req, res, next) {
	res.send('--- Este é um servidor Restify ---');
	next();
}

function create(req, res, next) {
	client.indices.create({
		index: req.params.index
	}, function (err, resp, status) {
		if (err) {
			console.log(err);
		} else {
			console.log("Criado : ", resp);
		}
	});

	res.send('Indice criado com sucesso');
	next();
}

function del(req, res, next) {
	client.indices.delete({
		index: req.params.index
	}, function (err, resp, status) {
		console.log("Deletado : ", resp);
	});

	res.send('Indice deletado com sucesso');
	next();
}

function status(req, res, next) {
	client.cluster.health({}, function (err, resp, status) {
		console.log("-- Status do Cliente --", resp);
	});

	res.send("-- Status do Cliente --");
	next();
}

function add_one(req, res, next) {
	client.index({
		index: req.body.index,
		type: req.body.type,
		id: req.body.id,
		body: {
			"title": req.body.data.title,
			"year": req.body.data.year,
			"genre": req.body.data.genre
		},
		refresh: true
	}, function (err, resp, status) {
		console.log(resp);
	});

	res.send("Indexado com sucesso");
	next();
}

/*

	Variável de rotas executada 
	no arquivo server.js (14).

*/

var routes = (server) => {
	/*
		Rotas Desafio
	*/

	server.post('/movies', add_several); //Usado para postar uma série de filmes de uma vez

	server.get('/movie', search); //Usado para buscar um filme na base de dados

	/*
		Rotas Extras
	*/

	server.get('/', test); //Usado para testar o servidor

	server.get('/create/:index', create); //Usado para criar um novo indice

	server.get('/delete/:index', del); //Usado para deletar um indice

	server.get('/status', status); //Usado para visualizar o status do cluster

	server.post('/movie', add_one); //Usado para postar um novo filme
}
module.exports = routes;