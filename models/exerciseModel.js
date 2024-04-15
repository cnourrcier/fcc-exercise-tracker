const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        get: duration => parseInt(duration),
        set: duration => parseInt(duration)
    },
    date: {
        type: Date
    }
}, { versionKey: false })

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
