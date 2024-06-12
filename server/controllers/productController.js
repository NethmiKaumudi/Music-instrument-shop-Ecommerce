const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify filename (you can customize this)
  }
});

const upload = multer({ storage: storage });
// const addProduct = async (req, res) => {
//   console.log(req.body)
//   try {
//     const { name, description, price, quantity, image } = req.body;

//     if (!image) {
//       return res.status(400).json({ error: "Image file is required" });
//     }

//     // Upload image to Cloudinary
//     const uploadedImage = await cloudinary.uploader.upload(image, {
//       folder: "Music-Ecommerce", // Specify the folder in which to store the image
//       upload_preset: "Music-Ecommerce", // Specify the upload preset configured in your Cloudinary account
//     });

//     // Set status based on quantity
//     const status = quantity > 0 ? "Available" : "Sold Out";

//     // Create new product instance
//     const product = new Product({
//       name,
//       description,
//       price: parseInt(price),
//       quantity: parseInt(quantity, 10),
//       image: uploadedImage,
//       status,
//     });

//     // Save product to database
//     const savedProduct = await product.save();

//     res.status(201).json({ message: "Product added successfully", product: savedProduct });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ message: "Failed to add product" });
//   }
// };
const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, image, category } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Convert image to Base64 string
    const imageData = image.data.toString("base64");

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageData}`, {
      folder: "Music-Ecommerce",
      upload_preset: "Music-Ecommerce",
    });

    // Set status based on quantity
    const status = quantity > 0 ? "Available" : "Sold Out";

    // Create new product instance
    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: uploadedImage.secure_url,
      category, // Add category to the product
      status,
    });

    // Save product to database
    const savedProduct = await product.save();

    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, image, category } = req.body;

    // Find the product by ID
    let product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (image) {
      // Upload new image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "Music-Ecommerce",
        upload_preset: "Music-Ecommerce",
      });
      product.image = uploadedImage.secure_url;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.quantity = quantity !== undefined ? parseInt(quantity, 10) : product.quantity;
    product.category = category || product.category; // Update category
    product.status = product.quantity > 0 ? "Available" : "Sold Out";

    // Save updated product to database
    const updatedProduct = await product.save();

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};


// Soft Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};



module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};