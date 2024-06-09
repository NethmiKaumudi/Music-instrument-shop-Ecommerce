const express = require('express');
const protectedRoutesController = require('../controllers/protectedRoutesController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.get('/protected', authMiddleware, protectedRoutesController.protectedRoute);

module.exports = router;