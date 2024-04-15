const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    log: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
}, { versionKey: false })

// Update the count each time an exercise is added to the log.
userSchema.pre('save', async function (next) {
    this.count = this.log.length;
    next();
})

// Format the log before sending to the client.
userSchema.virtual('logFormatted').get(function () {
    return this.log.map(log => ({
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString()
    }));
});

const User = mongoose.model('User', userSchema);

module.exports = User;
