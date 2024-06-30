import React from "react";
import HomeImage from "../../../assests/img/Home image.png";
import PrimaryButton from "../../Shared/PrimaryButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  // const navigate = useNavigate();

 

  return (
    <>

    <div className="relative  bg-secendary">
        <div className="container py-16 sm:py-[48px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]">
            {/* text section */}
            <div className="space-y-7 text-gray-950 order-2 sm:order-1">
              <h1 className="text-5xl">
                Your Rhythmic Instrument Haven{" "}
                <span className="text-secendaryDark font-cursive text-6xl">
                  NKBEATS
                </span>
              </h1>
              <p className="lg:pr-56 pl-1 text-xl">
                Unrivaled selection, expert guidance, and unbeatable prices—your
                top choice for musical instruments.
              </p>
              <div className="pl-1">
              {/* Add Shopnow button */}
              <PrimaryButton >Shop Now</PrimaryButton>
{/* <Link to={"/product-list"}>Shop Now</Link> */}
              </div>
            </div>
            {/* button section */}

            {/* image section */}
            <div className="relative z-30 order -1 sm:order-2">
              <img src={HomeImage} alt="" className="w-full h-auto sm:scale-125 sm:translate-y-16" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
