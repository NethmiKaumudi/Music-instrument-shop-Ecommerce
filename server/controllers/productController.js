const Product = require('../models/productModel');

// Controller function to create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Check if the user is an admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can add products' });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).json({ message: error.message });
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
};

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Controller function to update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.file) product.imageUrl = req.file.path; // Update imageUrl if a new file is uploaded

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Controller function to soft delete a product
exports.softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.isDeleted = true;
    await product.save();
    res.json({ message: 'Product soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
