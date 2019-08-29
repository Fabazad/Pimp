const StepModel = require('../models/step.model');

StepModel.findOne({main: true}).then(mainStep => {
    if(!mainStep) {
        const newMainStep = new StepModel({title: "Pimp", main: true});
        newMainStep.save();
    }
});

class StepController {

    static async create(stepData, stepId) {
        const step = new StepModel(stepData);
        await step.save();
        return await StepModel.findByIdAndUpdate(stepId, {$push: {steps: step._id}}, {new: true}).populate('steps');
    }

    static async getOneById(stepId) {
        return await StepModel.findById(stepId).populate('steps');
    }

    static async getFirstOne() {
        return await StepModel.findOne({main: true}).populate('steps');
    }
}

module.exports = StepController;