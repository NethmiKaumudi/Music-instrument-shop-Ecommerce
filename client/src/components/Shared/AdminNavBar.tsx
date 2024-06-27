import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
// import { logoutUser } from "../../api/authApi";
import logo from "../../assests/img/nk music logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // logoutUser();
  //   navigate("/login");
  // };
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    navigate("/login");
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
      <button
        className="flex items-center bg-secendary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout} // Call handleLogout when the button is clicked
      >
        <IoLogOutOutline className="mr-2" style={{ borderRadius: '50%' }} /> Log Out
      </button>
    </nav>
  );
};

export default Navbar;
