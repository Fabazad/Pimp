const kittenRoutes = require('./routes/kitten.routes');

async function routes (fastify) {
    fastify.get("/", (request, reply) => {
        reply.sendFile("index.html");
    })
    kittenRoutes(fastify);
}

module.exports = routes;
