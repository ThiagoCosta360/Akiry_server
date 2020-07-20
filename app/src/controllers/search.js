var client = require('../elastic');

/*

	Variável de busca, onde as queries de busca
	são interpretadas e retornam o resultado 
	solicitado pela rota em routes.js (99)

*/

var search = async function (req, res, next) {
	let result = [];
	let counter = 0;

	const field = req.query.field;
	const q = req.query.q;

	if (field == "title") {
		var response = await client.search({
			size: 2000,
			index: 'index',

			body: {
				query: {
					match: {
						title: q
					}
				},
			}
		}, function (error, response, status) {
			if (error) {
				console.log("search error: " + error)
			} else {
				console.log("--- Response ---");
				console.log(response);
				console.log("--- Hits ---");
				for (const movie of response.hits.hits) {
					result[counter] = movie._source;

					console.log('filme ', counter, ': ', movie._source);
					counter++;
				}
			}
			res.send(result);
		});
	} else if (field == "id") {
		var response = await client.search({
			size: 2000,
			index: 'index',
			body: {
				query: {
					match: {
						id: q
					}
				},
			}
		}, function (error, response, status) {
			if (error) {
				console.log("search error: " + error)
			} else {
				console.log("--- Response ---");
				console.log(response);
				console.log("--- Hits ---");
				for (const movie of response.hits.hits) {
					result[counter] = movie;

					console.log('filme ', counter, ': ', movie._source);
					counter++;
				}
			}
			res.send(result);
		});
	} else if (field == "genre") {

		if (Array.isArray(q)) {
			var response = await client.search({
				size: 2000,
				index: 'index',
				body: {
					query: {
						bool: {
							must: [{
									match: {
										genre: q[0]
									}
								},
								{
									match: {
										genre: q[1]
									}
								}
							]

						}
					},
				}
			}, function (error, response, status) {
				if (error) {
					console.log("search error: " + error)
				} else {
					console.log("--- Response ---");
					console.log(response);
					console.log("--- Hits ---");
					for (const movie of response.hits.hits) {
						result[counter] = movie._source;

						console.log('filme ', counter, ': ', movie._source);
						counter++;
					}
				}
				res.send(result);
			});
		} else {
			var response = await client.search({
				size: 2000,
				index: 'index',
				body: {
					query: {
						bool: {
							must: [{
								match: {
									genre: q
								}
							}]
						}
					},
				}
			}, function (error, response, status) {
				if (error) {
					console.log("search error: " + error)
				} else {
					console.log("--- Response ---");
					console.log(response);
					console.log("--- Hits ---");
					for (const movie of response.hits.hits) {
						result[counter] = movie._source;

						console.log('filme ', counter, ': ', movie._source);
						counter++;
					}
				}
				res.send(result);
			});
		}

	}

	next();
}

module.exports = search;