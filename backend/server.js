'use strict'

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes'));
fastify.register(require('./db-connection'));

// Run the server!
const start = () => {
  fastify.listen(3000)
  .catch (err => {
    fastify.log.error(err)
    process.exit(1)
  });
}
start()