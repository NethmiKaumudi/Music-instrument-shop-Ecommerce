// // import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import LoginImage from "../assests/img/Login Image.png";
// import { loginUser } from "../api/authApi"; // Import authentication functions
// import { useState } from "react";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const userData = await loginUser(username, password);

//       // Decode the token to extract role information
//       const role: string = userData.role; // Access the role from the response

//       // Display success message
//       await Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         text: "You have successfully logged in.",
//       });

//       if (location.pathname === "/cart") {
//         // If user logged in during checkout, navigate to payment page with data
//         const { formData, cart } = location.state as { formData: any; cart: any[] };
//         navigate("/payment", { state: { formData, cart } });
//       } else if (role === "customer") {
//         // If user is a customer, navigate to product list page
//         navigate("/product-list");
//       } else if (role === "admin") {
//         // If user is an admin, navigate to admin dashboard or product add form
//         navigate("/admin"); // Update this based on your actual admin route
//       } else {
//         // Default redirect, can be modified based on requirements
//         navigate("/"); // Redirect to home or login page
//       }
//     } catch (error) {
//       // Handle login errors
//       setError("Invalid username or password. Please try again."); // Example error handling
//       console.error("Login error:", error);
//     }
//   };

//   const handleSignupRedirect = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
//       <div className="max-w-6xl w-full p-8 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="flex flex-col justify-center p-4 md:p-8">
//           <h2 className="text-4xl text-inter mb-6">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-inter font-bold mb-2"
//                 htmlFor="username"
//               >
//                 Username
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-inter font-bold mb-2"
//                 htmlFor="password"
//               >
//                 Password
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             {error && <div className="text-red-500 text-sm mb-6">{error}</div>}
//             <div className="flex items-center mb-4">
//               <span className="text-gray-700 text-inter ">
//                 Don't have an account?{" "}
//               </span>
//               <button
//                 className="text-primaryDark hover:underline ml-8"
//                 type="button"
//                 onClick={handleSignupRedirect}
//               >
//                 Sign Up
//               </button>
//             </div>
//             <button
//               className="bg-primaryDark hover:bg-secondaryDark text-white font-bold py-3 px-8 rounded mb-4 mt-3"
//               type="submit"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//         <div className="hidden md:block">
//           <img
//             src={LoginImage}
//             alt="Login"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginImage from "../assests/img/Login Image.png";
import { loginUser } from "../api/authApi";

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

      // Decode the token to extract role information
      const role: string = userData.role; // Access the role from the response

      // Display success message
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
      });
      
      // const fromCheckoutWithData =
      //   location.state && location.state.formData && location.state.cart;
      //   const fromCheckoutSignUpWithData =
      //   location.state && location.state.formData && location.state.signup;
      
      // console.log("fromCheckoutWithData:", fromCheckoutWithData);
      // console.log("fromCheckoutSignUpWithData:", fromCheckoutSignUpWithData);
      
      // if (fromCheckoutSignUpWithData) {
      //   console.log("Signup state:", location.state);
      //   console.log("Signup formData:", location.state.formData);
      // }

      console.log(signup);
      console.log(cart);
      console.log(formData);


      if (signup) {
        // If redirected from signup with data, navigate to payment page
        navigate('/payment', { state: { formData, cart } });
      }  else if (cart) {
        // If redirected from checkout with cart data
        navigate('/payment', { state: { formData, cart } });
      } else if (role === "customer") {
        // If user is a customer but didn't come with checkout data, navigate to product list page
        navigate("/product-list");
      } else if (role === "admin") {
        // If user is an admin, navigate to admin dashboard
        navigate("/admin");
      } else {
        // Default redirect, can be modified based on requirements
        navigate("/");
      }
    } catch (error) {
      // Handle login errors
      setError("Invalid username or password. Please try again."); // Example error handling
      console.error("Login error:", error);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
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
  );
};

export default Login;
