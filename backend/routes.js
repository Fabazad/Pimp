const kittenRoutes = require('./routes/kitten.routes');

async function routes (fastify) {
    kittenRoutes(fastify);
}

module.exports = routes;
