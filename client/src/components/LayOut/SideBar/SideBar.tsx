import React from "react";
import { IonIcon } from "@ionic/react";
import { basketOutline, reloadOutline, logOutOutline } from "ionicons/icons";
import logo from "../../../assests/img/nk music logo.png";

interface SidebarProps {
  showSidebar: boolean;
  handleAddProductClick: () => void;
  handleLoadProductsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  showSidebar,
  handleAddProductClick,
  handleLoadProductsClick,
}) => {
  return (
    <>
      {showSidebar && (
        <div className="w-1/4 bg-yellow-900 p-8 shadow-lg">
          <a
            href="/"
            className="text-2xl text-black mr-4 pt-2 cursor-pointer flex items-center font-inter"
          >
            <img
              alt=""
              src={logo}
              className="d-inline-block align-top w-24 h-auto"
            />
            NKBEATS
          </a>

          <div className="bg-secondary p-2 rounded-lg mb-20 text-black text-center">
            <div className="font-bold mb-2">Today's Date</div>
            <div>{new Date().toLocaleDateString()}</div>
          </div>
          <div className="mt-4">
            <div className="hidden sm:flex sm:flex-col">
              <button
                type="button"
                className="flex items-center justify-center w-full hover:bg-primaryDark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-4"
                onClick={handleAddProductClick}
              >
                <IonIcon icon={basketOutline} size="large" className="mr-2" />
                Add Product
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full hover:bg-primaryDark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mb-4"
                onClick={handleLoadProductsClick}
              >
                <IonIcon icon={reloadOutline} size="large" className="mr-2" />
                Load Products
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-full hover:bg-primaryDark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              >
                <IonIcon icon={logOutOutline} size="large" className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
