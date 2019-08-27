const kittenRoutes = require('./routes/kitten.routes');

async function routes (fastify) {
    fastify.get("/", (request, reply) => {
        reply.sendFile(__dirname = "../frontend/build/index.html")
    })
    kittenRoutes(fastify);
}

module.exports = routes;
