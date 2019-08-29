const mongoose = require('mongoose');

var stepSchema = new mongoose.Schema({
    title: String,
    steps:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Step',
        default: []
      }],
    main: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Step', stepSchema);