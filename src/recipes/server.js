require('dotenv').config();

const port = process.env.PORT;

const { createServer } = require('http');
const router = require('find-my-way')();
const { recipes } = require('./recipe');

router.get('/recipes', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(recipes));
  response.end();
});

router.get('/recipes/:id', (request, response, params) => {
  const recipeId = params.id;
  const recipeIndex = recipes.findIndex((r) => (r.id === recipeId));
  if (recipeIndex === -1) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ error: `recipe ${recipeId} not found` }));
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(recipes[recipeIndex]));
  }
  response.end();
});

router.post('/recipes', (request, response) => {
  response.writeHead(201);
  response.end();
});

const server = createServer().listen(port)
  .on('request', (req, res) => router.lookup(req, res));

// eslint-disable-next-line no-console
console.log('Listening on port: ', port);

module.exports = server;
