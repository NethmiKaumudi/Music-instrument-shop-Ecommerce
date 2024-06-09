import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button
      className="bg-secendaryDark text-white font-inter py-2 px-6 rounded-md md:ml-8 hover:bg-secendary hover:text-black duration-500"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
