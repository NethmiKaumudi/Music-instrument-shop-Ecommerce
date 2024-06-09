import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { pencilOutline, trashOutline } from "ionicons/icons";
import Sidebar from "../components/LayOut/SideBar/SideBar"; // Import the Sidebar component

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductTablePageProps {
    handleLoadProductsClick: () => void;
    handleAddProductClick: () => void;
}

const ProductTablePage: React.FC<ProductTablePageProps> = ({
    handleAddProductClick,
    handleLoadProductsClick,
}) => {
  // Sample data for demonstration
  const products: Product[] = [
    { id: 1, name: "Product 1", description: "Description 1", price: 100 },
    { id: 2, name: "Product 2", description: "Description 2", price: 150 },
    { id: 3, name: "Product 3", description: "Description 3", price: 200 },
    { id: 4, name: "Product 4", description: "Description 4", price: 250 },
    { id: 5, name: "Product 5", description: "Description 5", price: 300 },
    { id: 6, name: "Product 6", description: "Description 6", price: 350 },
    { id: 7, name: "Product 7", description: "Description 7", price: 400 },
    { id: 8, name: "Product 8", description: "Description 8", price: 450 },
    { id: 9, name: "Product 9", description: "Description 9", price: 500 },
    { id: 10, name: "Product 10", description: "Description 10", price: 550 },
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 5;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        showSidebar={true} // Set the showSidebar prop to true
        handleAddProductClick={handleAddProductClick}
        handleLoadProductsClick={handleLoadProductsClick} // You can define the handleLoadProductsClick function as needed
      />
      {/* Main content */}
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        {/* Product Table */}
        <table className="min-w-full">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <button>
                    <IonIcon
                      icon={pencilOutline}
                      className="text-blue-500"
                    />
                  </button>
                  <button>
                    <IonIcon icon={trashOutline} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastProduct >= filteredProducts.length}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTablePage;
