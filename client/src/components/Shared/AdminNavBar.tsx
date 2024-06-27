
import React from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../assests/img/nk music logo.png";

interface NavbarProps {
  onSwitchToProducts?: () => void;
  onSwitchToOrders?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSwitchToProducts, onSwitchToOrders }) => {
  const handleProductsClick = () => {
    if (onSwitchToProducts) {
      onSwitchToProducts();
    }
  };

  const handleOrdersClick = () => {
    if (onSwitchToOrders) {
      onSwitchToOrders();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Assuming /login is the route for logging in
    window.location.href = "/login"; // Use window.location.href for full page reload
  };

  return (
    <nav className="bg-primaryDark p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-inter flex items-center text-white">
        <img
          alt=""
          src={logo}
          className="mr-1"
          style={{ width: "100px", height: "90px" }}
        />
        NKBEATS
      </Link>
      <div className="flex items-center space-x-4">
        <button
          className="bg-secendary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          onClick={handleProductsClick}
        >
          Products
        </button>
        <button
          className="bg-secendary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          onClick={handleOrdersClick}
        >
          Orders
        </button>
        <button
          className="flex items-center bg-secendary hover:bg-primary text-white font-bold py-2 px-4 rounded ml-auto"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="mr-2" style={{ borderRadius: '50%' }} /> Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
