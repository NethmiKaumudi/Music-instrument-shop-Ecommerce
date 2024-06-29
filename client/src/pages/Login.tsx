import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginImage from "../assests/img/Login Image.png";
import { loginUser } from "../api/authApi";
import logo from '../assests/img/nk music logo.png'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cart, signup } = location.state || {};

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userData = await loginUser(username, password);

      const role: string = userData.role; 

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
      });
      
    

      console.log(signup);
      console.log(cart);
      console.log(formData);


      if (signup) {
        navigate('/payment', { state: { formData, cart } });
      }  else if (cart) {
        navigate('/payment', { state: { formData, cart } });
      } else if (role === "customer") {
        navigate("/product-list");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again."); 
      console.error("Login error:", error);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <div className="flex justify-start p-4">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt="logo"
            src={logo}
            className="mr-1"
            style={{ width: '100px', height: '90px' }}
          />
          {/* NKBEATS */}
        </Link>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <div className="max-w-6xl w-full p-8 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h2 className="text-4xl text-inter mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-inter font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-inter font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-6">{error}</div>}
              <div className="flex items-center mb-4">
                <span className="text-gray-700 text-inter">
                  Don't have an account?{" "}
                </span>
                <button
                  className="text-primaryDark hover:underline ml-8"
                  type="button"
                  onClick={handleSignupRedirect}
                >
                  Sign Up
                </button>
              </div>
              <button
                className="bg-primaryDark hover:bg-secondaryDark text-white font-bold py-3 px-8 rounded mb-4 mt-3"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <div className="hidden md:block">
            <img
              src={LoginImage}
              alt="Login"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
