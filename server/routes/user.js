const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes using the controller functions
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
