import React, { useState } from "react";
import { addProduct } from "../api/productAoi";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";

interface AddProductPopupProps {
  onClose: () => void;
}

const AddProduct: React.FC<AddProductPopupProps> = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    quantity: "",
    category: "", // New category field
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | File) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await addProduct(product);
      await Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "The product has been successfully added.",
      });
      setProduct({
        name: "",
        description: "",
        price: "",
        image: null,
        quantity: "",
        category: "", // Reset category field after successful submission
      });
      setError(null);
      onClose();
    } catch (error: any) {
      console.error("Product add error:", error);
      setError("Failed to add product. Please try again.");
      await Swal.fire({
        icon: "error",
        title: "Product Addition Failed!",
        text: "Failed to add product. Please try again.",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-primaryDark rounded-lg shadow-lg p-4 relative w-full max-w-xl"> {/* Increased max width to max-w-xl */}
    <h2 className="text-xl font-semibold mb-2 text-white">Add Product</h2>
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full"
    >
        <div className="mb-6">
          <label
            htmlFor="ProductName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="ProductDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Description
          </label>
          <input
            id="description"
            type="text"
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="ProductPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Price
          </label>
          <input
            id="price"
            type="text"
            value={product.price}
            onChange={(e) => handleChange("price", e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            value={product.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 flex items-center">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mr-2">
            Product Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleChange("image", e.target.files[0]);
              }
            }}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          {product.image && (
            <img src={URL.createObjectURL(product.image)} alt="Product" className="w-32 h-auto" />
          )}
        </div>


        <div className="mb-6">
          <label
            htmlFor="ProductQuantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Quantity
          </label>
          <input
            id="quantity"
            type="text"
            value={product.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-secendaryDark hover:bg-secendary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          style={{ height: "40px" }}
        >
          Add Product
        </button>
      </form>
      <IoClose
        className="absolute top-4 right-4 text-white size-8 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

export default AddProduct;
