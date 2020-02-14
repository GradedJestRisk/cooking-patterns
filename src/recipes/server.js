require('dotenv').config();

const port = process.env.PORT;
const { API_URL } = process.env;

const { createServer } = require('http');
const router = require('find-my-way')();
const parse = require('co-body');
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
  parse(request)
    .then((body) => {
      if ( body.name === undefined || body.description === undefined) {
        response.writeHead(400);
        response.write(JSON.stringify({ error: 'recipe must include the following properties: name, description' }));
      } else {
        const id = 3;
        const location = `${API_URL + request.url}/${id}`;
        response.writeHead(201, { 'Content-Type': 'application/json', location });
        const recipe = { ...body, id };
        response.write(JSON.stringify(recipe));
      }
    })
  // eslint-disable-next-line no-console
    .catch((error) => console.error(error.message))
    .finally(() => response.end());
});

const server = createServer().listen(port)
  .on('request', (req, res) => router.lookup(req, res));

// eslint-disable-next-line no-console
console.log('Listening on port: ', port);

module.exports = server;
