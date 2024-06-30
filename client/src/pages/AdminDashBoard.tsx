import React, { useState } from "react";
import Navbar from "../components/Shared/AdminNavBar";
import AddProductPopup from "../pages/AdminProductAddPage";
import ProductTable from "../pages/AdminProductLoadPage";
import OrderLoadPage from "../pages/OrdersLoadPage"; 

const AdminDashBordPage: React.FC = () => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showProducts, setShowProducts] = useState(true);

  const handleOpenPopup = () => {
    setShowAddProductPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddProductPopup(false);
  };

  const handleSwitchToProducts = () => {
    setShowProducts(true);
  };

  const handleSwitchToOrders = () => {
    setShowProducts(false);
  };

  const handleAdd = () => {
    // Implement logic to update product list here
    window.location.reload();
    console.log("Product list updated!"); // Placeholder example
  };

  return (
    <>
      <Navbar onSwitchToProducts={handleSwitchToProducts} onSwitchToOrders={handleSwitchToOrders} />
      <div className="flex justify-end p-4">
        {showProducts && ( // Only show Add Product button if showProducts is true
          <button className="bg-primaryDark hover:bg-primary text-white font-bold py-2 px-4 rounded" onClick={handleOpenPopup}>
            Add Product
          </button>
        )}
      </div>
      {showAddProductPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AddProductPopup onClose={handleClosePopup} onAdd={handleAdd} />
        </div>
      )}
      <div className="w-full">
        {showProducts ? <ProductTable /> : <OrderLoadPage />}
      </div>
    </>
  );
};

export default AdminDashBordPage;

