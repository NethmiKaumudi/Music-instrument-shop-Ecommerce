import React from "react";
import { IonIcon } from "@ionic/react";
import { basketOutline, reloadOutline, logOutOutline } from "ionicons/icons";
// import { logoutUser } from "../../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logoutUser();
    navigate("/");
  };

  return (
    <>
      {showSidebar && (
        <div className="flex flex-col h-screen w-1/4 bg-yellow-900 p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-white font-bold">Admin Panel</h1>
            <div className="text-white">{new Date().toLocaleDateString()}</div>
          </div>

          <div className="flex flex-col flex-grow mb-8">
            <Link to="/admin/add-product" className="sidebar-link">
              <button
                type="button"
                className="flex items-center justify-center bg-primary hover:bg-primaryDark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                <IonIcon icon={basketOutline} size="large" className="mr-2" />
                Add Product
              </button>
            </Link>
            <Link to="/admin/load-product" className="sidebar-link">
              <button
                type="button"
                className="flex items-center justify-center bg-primary hover:bg-primaryDark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                <IonIcon icon={reloadOutline} size="large" className="mr-2" />
                Load Products
              </button>
            </Link>
          </div>

          <button
            type="button"
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            <IonIcon icon={logOutOutline} size="large" className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
