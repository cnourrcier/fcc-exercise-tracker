const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.route('/')
    .get(userController.getHomePage)

router.route('/api/users')
    .get(userController.getAllUsers) // Send list of all users to client 
    .post(userController.createNewUser) // Create a new user 

router.route('/api/users/:_id/exercises')
    .post(userController.createNewExercise) // Create a new exercise and push to user exercise log. Send exercise data to client.

router.route('/api/users/:_id/logs')
    .get(userController.viewExecisesLog) // View specified user data and log of exercises. 

module.exports = router;