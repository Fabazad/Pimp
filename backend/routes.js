const kittenRoutes = require('./routes/kitten.routes');
const stepRoutes = require('./routes/step.routes');

async function routes (fastify) {
    kittenRoutes(fastify);
    stepRoutes(fastify);
}

module.exports = routes;
