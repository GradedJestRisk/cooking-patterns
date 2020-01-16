const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });


server.route(require('./routes'))

server.start((err) => {

  if (err) {
            throw err
        }
        console.log('Server listening at:', server.info.uri)
    })

}

