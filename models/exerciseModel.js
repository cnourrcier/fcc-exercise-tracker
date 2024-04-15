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

// Handle the date format before saving. If no date provided, use current date. 
exerciseSchema.pre('save', async function (next) {
    if (this.date === '' || this.date === undefined || this.date === null) {
        this.date = new Date();
    } else {
        this.date = new Date(this.date);
    }
    next();
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
