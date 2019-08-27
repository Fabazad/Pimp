const KittenController = require('../controllers/kitten.controller')

async function kittenRoutes (fastify) {
    fastify.get('/', async (request, reply) => {
        const kitten = await KittenController.action();
        return kitten;
    })
}

module.exports = kittenRoutes