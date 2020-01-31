require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { recipesList } = require('./recipe');

const server = Hapi.server({ port: process.env.API_PORT, host: 'localhost' });

server.route([
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h
        .response(JSON.stringify({ resources: 'recipe' }))
        .type('application/json');
    },
  },
  {
    method: 'GET',
    path: '/recipes',
    handler: (request, h) => {
      return h
        .response(JSON.stringify(recipesList))
        .type('application/json');
    },
  },
]);

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start;
  // eslint-disable-next-line no-console
  console.log('server listening at %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});
