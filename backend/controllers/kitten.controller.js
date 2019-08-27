const KittenModel = require('../models/kitten.model');

class KittenController {
    static async action() {
        const silence = new KittenModel({ name: 'Silence' });
        await silence.save();
        silence.speak();
        return silence;
    }
}

module.exports = KittenController;