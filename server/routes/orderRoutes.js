// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');

// // POST /api/orders/placeOrder
// router.post('/placeOrder', orderController.placeOrder);

// module.exports = router;
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/placeOrder', authMiddleware('customer', 'admin'), orderController.placeOrder);

module.exports = router;
