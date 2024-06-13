

import React from "react";
import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  // to: string; // Define the route to navigate to
  children: React.ReactNode; // Define children as React.ReactNode
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({  children }:PrimaryButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product-list");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-primaryDark text-white py-3 px-6 rounded-lg shadow-md hover:bg-secendaryDark transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
