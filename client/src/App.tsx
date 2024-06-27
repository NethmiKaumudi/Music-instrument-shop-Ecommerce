
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProductList from "./pages/ProductListPage";
import CartPage from "./pages/Cartpage";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import AdminDashBoard from "./pages/AdminDashBoard";
import StripeProvider from "./api/stripePovider"; // Import the StripeProvider component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Wrap the Payment component with StripeProvider */}
        <Route path="/payment" element={<StripeProvider><Payment /></StripeProvider>} /> 
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
