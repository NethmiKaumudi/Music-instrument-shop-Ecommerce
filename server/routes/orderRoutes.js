const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/orders/placeOrder
router.post('/placeOrder', orderController.placeOrder);

module.exports = router;
