const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const User = require('./models/userModel');
const Exercise = require('./models/exerciseModel');

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR)
  .then(() => {
    console.log('Connected to MongoDB');
  })

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Send list of all users to client 
app.get('/api/users', async (req, res) => {
  const allUsers = await User.find({}).select('_id username');
  res.json(allUsers);
})

// Create a new user 
app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json({ username: user.username, _id: user._id });
})

// Create a new exercise and push to user exercise log. Send exercise data to client.
app.post('/api/users/:_id/exercises', async (req, res) => {
  const user = await User.findById({ _id: req.params._id });
  if (!user) {
    res.send('User not found');
  }
  const newExercise = new Exercise({
    date: req.body.date,
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
})

// View specified user data and log of exercises. 
app.get('/api/users/:_id/logs', async (req, res) => {
  const { from, to, limit } = req.query;
  const populateOptions = { path: 'log', select: '-_id -userId' };

  if (from || to) {
    const dateFilter = {};
    if (from) dateFilter.$gte = from;
    if (to) dateFilter.$lte = to;
    populateOptions.match = { date: dateFilter }
  }
  console.log(populateOptions);
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
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
