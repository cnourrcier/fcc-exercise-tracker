const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');


router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    })

router.route('/api/users')
    .get(async (req, res) => {
        const allUsers = await User.find({}).select('_id username');
        res.json(allUsers)
    }) // Send list of all users to client 
    .post(async (req, res) => {
        const user = await User.create(req.body);
        res.json({ username: user.username, _id: user._id });
    }) // Create a new user 

router.route('/api/users/:_id/exercises')
    .post(async (req, res) => {
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
    }) // Create a new exercise and push to user exercise log. Send exercise data to client.

router.route('/api/users/:_id/logs')
    .get(async (req, res) => {
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
    }) // View specified user data and log of exercises. 

module.exports = router;