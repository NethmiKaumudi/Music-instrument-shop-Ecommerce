const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // No specific destination, pass null to maintain original path
    cb(null, ''); 
  },
  filename: function (req, file, cb) {
    // Use the original filename to maintain the file's path and name
    cb(null, file.originalname); 
  },
});

// Create the Multer instance
const upload = multer({ storage: storage });

// Define product routes
router.post('/', authMiddleware, upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.softDeleteProduct);

module.exports = router;
