import React from "react";
// import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const PrimaryButton = ({ onClick }: any) => {
  return (
    <div className="flex items-center group">
      <button
        className="bg-secendaryDark h-[40px] text-white px-3 py-2 cursor-pointer" // Add cursor-pointer class here
        type="button"
        onClick={onClick} // Pass the onClick handler to the button element
      >
        Shop Now
      </button>
      <FaArrowRight className="inline-block group-hover:-translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-secendaryDark text-white" />
    </div>
  );
};

export default PrimaryButton;
