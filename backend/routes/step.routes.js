const StepController = require('../controllers/step.controller')

async function stepRoutes (fastify) {
    const path = "/api/step/"
    fastify.post(path + 'create', async (request, reply) => {
        const {item, options} = request.body;
        return await StepController.create(item, options.stepId);
    });

    fastify.get(path + ':stepId', async (request, reply) => {
        return await StepController.getOneById(request.params.stepId);
    });

    fastify.get(path, async (request, reply) => {
        return await StepController.getFirstOne();
    });

    fastify.post(path + 'update', async (request, reply) => {
        const {itemId, fields} = request.body;
        return await StepController.update(itemId, fields);
    });
}

module.exports = stepRoutes