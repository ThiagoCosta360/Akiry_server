# API de filmes

>Este projeto foi desenvolvido durante a resolução do desafio proposto pela start-up Akiry com o intuito de promover uma compreensão maior de como funciona o desenvolvimento back-end utilizando as ferramentas descritas abaixo.


## Introdução

>Servidor de busca de dados sobre filmes. Onde é possível cadastrar informações e fazer buscas personalizadas

### Pré-requisitos

- [**Node.js**](https://nodejs.org) versão 8.11.3 ou superior.
- [**Elasticsearch**](https://www.elastic.co/downloads/elasticsearch) versão 6.3.1 ou superior.

### Opcional

- [**Kibana**](https://www.elastic.co/downloads/kibana) versão 6.3.1 ou superior
- [**Postman**](https://www.getpostman.com/apps) versão 6.1.4 ou superior

## Base de dados

* Para o exemplo foi utilizado a base [MovieLens 100k](https://grouplens.org/datasets/movielens/100k/) (ml100k), com dados de 100 mil filmes e reviews.

* Para converter os campos "title", "year" e "genre" do arquivo u.item para o formato JSON execute conversor.exe e um arquivo com nome de movie.json será criado. O código da aplicação é discriminado em main.c

## Passos de instalação do servidor:

* Clone o repositório
* Execute o elasticsearch
* Execute o kibana (opcional)
* Abra a pasta "Akiry_server/app" no seu terminal
* Execute os seguintes comandos:
	```
	npm init
	```
	```
	npm install
	```
	```
	npm start
	```


## Como utilizar a API:

> A aplicação é composta pelas seguintes rotas que podem ser testadas no Postman:

* `POST /movies`

	Deve receber no _request body_ um array de objetos JSON no seguinte formato:

	```
	[
		{
			"title": "Title 1",
			"year": 1998,
			"genres": [ "Comedy", "Action" ]
		},
		{
			"title": "Title 2",
			...
		},
		...
	]
	```

	* Copie e utilize o conteúdo do arquivo movie.json
	* Dessa forma os dados estão indexados no elasticsearch, como pode se observar em `http://localhost:5601` caso esteja utilizando kibana. 

* `GET /movie`

	Esta rota deve receber uma query com os campos `field` e `q`. O campo `field` determina o campo em que se está realizando a busca, e `q` contém o valor que se está buscando. A query possibilita buscas pelos seguintes campos:

	* Título: o valor de `field` deverá ser `title` e o valor de `q` deverá ser o título. O servidor realizará uma busca pelos filmes com o título fornecido.

		* Exemplo: `localhost:8080/movie?field=title&q=Batman` deverá fazer uma busca por filmes com "Batman" no título.

	* Id: o valor de `field` deverá ser `id` e o valor de `q` deverá ser o id. Caso exista o filme com o id fornecido, servidor retornará o filme em formato JSON. Caso ele não exista, o retorno é uma array vazia.

		* Exemplo: `localhost:8080/movie?field=id&q=1012` deverá retornar o filme de id `1012`, supondo que ele existe.

	* Gênero: o valor de field deverá ser `genre` e o valor de `q` deverá ser o gênero; `q` pode ter múltiplos valores, significando múltiplos gêneros. O servidor retornará os filmes que se encaixem nos gêneros fornecidos pela query.

		* Exemplo: se eu estiver em busca de filmes de comédia romântica, usaria a rota `localhost:8080/video?field=genres&q=Action&q=Adventure`.