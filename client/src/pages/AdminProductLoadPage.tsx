import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPencil, IoTrash } from "react-icons/io5";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const AdminProductLoadPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate 10 dummy products
        const dummyProducts: Product[] = [];
        for (let i = 0; i < 10; i++) {
          dummyProducts.push({
            id: `${i + 1}`,
            name: `Dummy Product ${i + 1}`,
            description: `This is a dummy product description for product ${i + 1}.`,
            price: Math.random() * 100, // Generate a random price
            imageUrl: `https://via.placeholder.com/150?text=Product${i + 1}`, // Use a placeholder image URL
          });
        }

        // Calculate total pages based on the number of products and products per page
        const totalPages = Math.ceil(dummyProducts.length / productsPerPage);

        // Slice the dummy products to display only the products for the current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsForCurrentPage = dummyProducts.slice(startIndex, endIndex);

        // Set the generated dummy products and total pages
        setProducts(productsForCurrentPage);
        setTotalPages(totalPages);

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleEditProduct = (id: string) => {
    // Implement edit functionality here
  };

  const handleDeleteProduct = async (id: string) => {
    // Implement delete functionality here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-8">
      {loading ? (
        <div className="bg-yellow-700 hover:bg-yellow-900 w-36 text-white font-bold py-2 px-4 rounded relative">Loading...</div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">Product List</h1>
          <table className="min-w-full bg-white border">
          <thead className="bg-primaryDark text-white">
          <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="mr-2 text-secendaryDark size-14"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <IoPencil />
                    </button>
                    <button
                      className="text-secendaryDark size-14"
                      onClick={() => handleDeleteProduct(product.id)}
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
                className={`mr-2 py-2 px-4 ${
                  currentPage === i + 1 ? "bg-black text-white" : "bg-white"
                } border`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductLoadPage;
