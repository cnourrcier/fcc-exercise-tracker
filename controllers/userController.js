const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');
const path = require('path');


exports.getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}

exports.getAllUsers = async (req, res) => {
    const allUsers = await User.find({}).select('_id username');
    res.json(allUsers)
}

exports.createNewUser = async (req, res) => {
    const user = await User.create(req.body);
    res.json({ username: user.username, _id: user._id });
}

exports.createNewExercise = async (req, res) => {
    const user = await User.findById({ _id: req.params._id });
    if (!user) {
        res.send('User not found');
    }
    let { date } = req.body;
    if (date === '' || date === undefined || date === null) {
        date = new Date();
    } else {
        date = new Date(date.replace(/-/g, '\/'));
    }
    const newExercise = new Exercise({
        date: date,
        duration: req.body.duration,
        description: req.body.description
    });

    user.log.push(newExercise);
    await newExercise.save();
    await user.save();
    res.json({
        _id: user._id,
        username: user.username,
        date: new Date(newExercise.date).toDateString(),
        duration: newExercise.duration,
        description: newExercise.description
    });
}

exports.viewExecisesLog = async (req, res) => {
    const { from, to, limit } = req.query;
    const populateOptions = { path: 'log', select: '-_id -userId' };

    if (from || to) {
        const dateFilter = {};
        if (from) dateFilter.$gte = from;
        if (to) dateFilter.$lte = to;
        populateOptions.match = { date: dateFilter }
    }
    const user = await User.findById({ _id: req.params._id }).populate(populateOptions);
    if (!user) {
        res.send('User not found');
    }
    let log = user.logFormatted;
    if (limit) {
        log = log.slice(0, parseInt(limit));
    }
    res.json({
        _id: user._id,
        username: user.username,
        count: user.count,
        log: log
    });
}