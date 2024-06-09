import React from "react";
import { FaArrowRight } from "react-icons/fa";

const PrimaryButton: React.FC = () => {
  return (
    <>
      <div className="flex items-center group">
        <button className="bg-secendaryDark h-[40px] text-white px-3 py-2">
          Shop Now
        </button>
        <FaArrowRight className="inline-block group-hover:-translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-secendaryDark text-white" />
      </div>
    </>
  );
};

export default PrimaryButton;
