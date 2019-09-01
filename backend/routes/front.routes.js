async function frontRoutes (fastify) {
    fastify.get('/edit-step/', async (req, reply) => {
        reply.sendFile("index.html");
    });
    fastify.get('/edit-step/:id', async (req, reply) => {
        reply.sendFile("index.html");
    });
    fastify.get('/step/', async (req, reply) => {
        reply.sendFile("index.html");
    });
    fastify.get('/step/:id', async (req, reply) => {
        reply.sendFile("index.html");
    });
}

module.exports = frontRoutes