require('dotenv').config();

const port = process.env.PORT;
const { API_URL } = process.env;

const { createServer } = require('http');
const router = require('find-my-way')();
const parse = require('co-body');
const { recipes } = require('./recipe');

const responseCode = {
  created: 201,
  success: 200,
  error: {
    unauthorized: 400,
    notFound: 404,
  },
};

class Logger {
  constructor() {
    this.messages = [];
  }

  log(message) {
    this.messages.push(message);
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

const logger = new Logger();

router.get('/recipes', (request, response) => {
  logger.log('Request on GET /recipes');
  response.writeHead(responseCode.success, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(recipes));
  response.end();
});

router.get('/recipes/:id', (request, response, params) => {
  const recipeId = params.id;
  const recipeIndex = recipes.findIndex((r) => (r.id === recipeId));
  if (recipeIndex === -1) {
    response.writeHead(responseCode.error.notFound, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ error: `recipe ${recipeId} not found` }));
  } else {
    response.writeHead(responseCode.success, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(recipes[recipeIndex]));
  }
  response.end();
});


router.post('/recipes', (request, response) => {
  parse(request)
    .then((body) => {
      const receivedRecipe = body;
      if (!receivedRecipe.name || !receivedRecipe.description) {
        response.writeHead(responseCode.error.unauthorized);
        response.write(JSON.stringify({ error: 'recipe must include the following properties: name, description' }));
      } else {
        const id = 3;
        const location = `${API_URL + request.url}/${id}`;
        response.writeHead(responseCode.created, { 'Content-Type': 'application/json', location });
        const createdRecipe = { ...receivedRecipe, id };
        response.write(JSON.stringify(createdRecipe));
      }
    })
  // eslint-disable-next-line no-console
    .catch((error) => console.error(error.message))
    .finally(() => response.end());
});

const server = createServer().listen(port)
  .on('request', (req, res) => router.lookup(req, res));


logger.log(`Listening on port: ${port}`);

module.exports = { server, logger };
