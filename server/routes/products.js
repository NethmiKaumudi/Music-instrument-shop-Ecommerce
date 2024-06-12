const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');

// router.post('/add', authMiddleware, adminMiddleware, productController.addProduct);
router.post('/add', productController.addProduct);


// Define other routes for product CRUD operations with authMiddleware and adminMiddleware

module.exports = router;
