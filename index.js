const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR)
  .then(() => {
    console.log('Connected to MongoDB');
  })

// Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', userRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
