const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes using the controller functions
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/search/:email', userController.searchUserByEmail); // GET endpoint for searching by email

module.exports = router;
