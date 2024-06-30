import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPencil, IoTrash } from "react-icons/io5";
import AdminProductUpdateForm from "./AdminProductUpdatePage";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const AdminProductLoadPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/products/get");
      const fetchedProducts: Product[] = response.data;

      const filteredProducts = applySearchFilter(fetchedProducts, searchTerm);

      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

      setProducts(productsForCurrentPage);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Apply search filter function
  const applySearchFilter = (products: Product[], term: string) => {
    return products.filter((product) =>
      Object.values(product).some((value) =>
        typeof value === "string" ? value.toLowerCase().includes(term.toLowerCase()) : false
      )
    );
  };

  // Fetch products on initial component mount, whenever currentPage changes, or when searchTerm changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  // Handle editing a product
  const handleEditProduct = (id: string) => {
    const productToEdit = products.find((product) => product._id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
    }
  };

  
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });
  
  const handleDeleteProduct = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Product?',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        await axiosInstance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error!', 'Failed to delete product. Please try again later.', 'error');
    }
  };
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = () => {
    fetchProducts(); // This will trigger the fetch with updated searchTerm
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchProducts(); 
  };

  return (
    <div className="w-full p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-center">Product List</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-primaryDark hover:bg-primary text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
            Search
          </button>
          <button className="bg-red-500 hover:bg-red-300 text-whute font-bold py-2 px-4 ml-2 rounded" onClick={handleClearSearch}>
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table className="min-w-full bg-white border">
            <thead className="bg-secendaryDark text-white">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-black">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-fit h-16 object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">No Image</div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      title="Edit"
                      className="mr-3 hover:bg-secendary hover:text-white py-1 px-2 rounded"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      <IoPencil />
                    </button>
                    <button
                      title="Delete"
                      className="hover:bg-secendary hover:text-white py-1 px-2 rounded"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <IoTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 py-1 px-3 ${
                  currentPage === i + 1 ? "bg-gray-900 text-white" : "bg-gray-300 text-gray-700"
                } rounded`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Render the AdminProductUpdateForm when a product is selected for editing */}
      {selectedProduct && (
        <AdminProductUpdateForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdate={fetchProducts} 
        />
      )}
    </div>
  );
};

export default AdminProductLoadPage;
