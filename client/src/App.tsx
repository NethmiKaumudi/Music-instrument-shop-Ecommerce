import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import './'; 

const App: React.FC = () => {
  // useEffect(() => {
  //   const ioniconsScript = document.createElement("script");
  //   ioniconsScript.type = "module";
  //   ioniconsScript.src =
  //     "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
  //   document.head.appendChild(ioniconsScript);

  //   const ioniconsNomoduleScript = document.createElement("script");
  //   ioniconsNomoduleScript.src =
  //     "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
  //   document.head.appendChild(ioniconsNomoduleScript);

  //   return () => {
  //     // Clean up by removing the scripts when the component unmounts
  //     document.head.removeChild(ioniconsScript);
  //     document.head.removeChild(ioniconsNomoduleScript);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/product" element={<Product />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
