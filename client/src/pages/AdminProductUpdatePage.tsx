import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; 
import axios from "axios";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const AdminProductUpdateForm: React.FC<{
  product: Product; 
  onClose: () => void;
  onProductUpdate: () => void; 
}> = ({ product, onClose, onProductUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    ...product, 
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setUpdatedProduct({ ...updatedProduct, [field]: value });
  };

  
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/products/${product._id}`, {
        name: updatedProduct.name,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        category: updatedProduct.category,
      });
      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        showConfirmButton: false,
        timer: 1500,
      });
      onProductUpdate();
      onClose();
    } catch (error) {
      setError('Error updating product. Please try again.');
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center justify-center bg-primaryDark rounded-lg shadow-lg p-4 relative w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2 text-white">Update Product</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-lg w-full max-h-96 overflow-y-auto"
          style={{ maxHeight: "600px" }} 
        >
          {/* Product Name input field */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={updatedProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Product Price input field */}
          <div className="mb-5">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Price
            </label>
            <input
              id="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Product Quantity input field */}
          <div className="mb-5">
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={updatedProduct.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Product Category input field */}
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Category
            </label>
            <input
              id="category"
              type="text"
              value={updatedProduct.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Error message */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-secendaryDark hover:bg-secendary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Product
          </button>
        </form>

        {/* Close button */}
        <IoClose
          className="absolute top-4 right-4 text-white text-lg cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AdminProductUpdateForm;
