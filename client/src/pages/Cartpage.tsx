import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assests/img/nk music logo.png";
import { IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import axios from "axios";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems: { [key: string]: CartItem } =
    location.state?.cartItems || {};
  const [cart, setCart] = useState<CartItem[]>(Object.values(cartItems));
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "", 
  });

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCart = [...cart];
    if (increment) {
      updatedCart[index].quantity++;
    } else {
      updatedCart[index].quantity > 1 && updatedCart[index].quantity--;
    }
    setCart(updatedCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const token = localStorage.getItem("token"); // Check if token exists in localStorage

    if (token) {
      // Directly navigate to PaymentPage
      navigate("/payment", { state: { formData, cart } });
      return;
    }
    
    const { email } = formData;
    console.log(formData, cart);

    try {
      const response = await axios.get(
        `http://localhost:4000/auth/search/${email}`
      );
      const { exists } = response.data;
      console.log(exists);

      console.log(formData, cart);
      if (exists) {
        console.log(formData, cart);
        navigate("/login", { state: { formData, cart } });
      } else {
        console.log(formData, cart);
        navigate("/signup", { state: { formData, cart } });
      }
    } catch (error: any) {
      console.error("Error checking email:", error);
      if (error.response && error.response.status === 404) {
        navigate("/signup", { state: { formData ,cart} });
      } else {
        alert("Something went wrong!");
      }
    }
  };

  
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="nav-bar flex items-center justify-between bg-secondaryDark text-white py-2 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt="logo"
            src={logo}
            className="mr-1"
            style={{ width: "100px", height: "90px" }}
          />
          NKBEATS
        </Link>
        <Link
          to="/product-list"
          state={{
            cartItems: cart.reduce(
              (acc, item) => ({ ...acc, [item._id]: item }),
              {}
            ),
          }}
          className="ml-4 bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          Back to Products
        </Link>
      </nav>
      <div className="container mx-auto px-4 py-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={item._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        {item.name}
                      </div>
                    </td>
                    <td className="px-4 py-2">RS: {item.price}</td>
                    <td className="px-4 py-2 flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-full"
                        onClick={() => handleQuantityChange(index, false)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-full"
                        onClick={() => handleQuantityChange(index, true)}
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500"
                      >
                        <IonIcon icon={trash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-200">
                  <td colSpan={3} className="px-4 py-2 text-right font-bold">
                    Total:
                  </td>
                  <td className="px-4 py-2 font-bold">
                    RS: {calculateTotalPrice()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="md:col-span-1 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-2">
              Total Products: <span className="font-bold">{cart.length}</span>
            </p>
            <p className="mb-2">
              Total Quantity:{" "}
              <span className="font-bold">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                required
              />
              <label className="block mb-2">Address:</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full resize-none"
                rows={4}
                required
              />
              <label className="block mb-2">Contact Number:</label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                required
              />
              <label className="block mb-2">Email:</label>{" "}
              {/* Add Email field */}
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                required
              />
              <button
                type="submit"
                className="bg-primaryDark text-white px-4 py-2 rounded-lg hover:bg-primary focus:outline-none"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
