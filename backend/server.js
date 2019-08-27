const constants = require('./helpers/constants');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-cors'), { 
  origin: constants.FRONTEND_URL
});

fastify.register(require('./routes'));
fastify.register(require('./db-connection'));

// Run the server!
const start = () => {
  fastify.listen(process.env.PORT || '0.0.0.0')
  .catch (err => {
    fastify.log.error(err)
    process.exit(1)
  });
}
start()