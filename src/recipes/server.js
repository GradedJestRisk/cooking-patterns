require('dotenv').config();

const port = process.env.API_PORT;

const { createServer } = require('http');
const router = require('find-my-way')();
const { recipesList } = require('./recipe');

router.get('/', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ resources: 'recipe' }));
  response.end();
});

router.get('/recipes', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(recipesList));
  response.end();
});

const server = createServer().listen(port)
  .on('request', (req, res) => router.lookup(req, res));

// eslint-disable-next-line no-console
console.log('Listening on port: ', port);

module.exports = server;
