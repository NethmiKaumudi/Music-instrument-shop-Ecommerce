import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { trash } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import logo from "../assests/img/nk music logo.png"; // Assuming you have a logo image

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}
interface Country {
  name: string;
}
const CartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(
    location.state?.cartItems || []
  );
  const [countries, setCountries] = useState<string[]>([]); // Change to string[]

  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch country data");
      }
      const data: any[] = await response.json();
      const countryNames = data.map((country: any) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  // Dummy data
  const dummyCartItems: CartItem[] = [
    { name: "Product 1", price: 25, quantity: 2, category: "Category A" },
    { name: "Product 2", price: 30, quantity: 1, category: "Category B" },
    { name: "Product 3", price: 20, quantity: 3, category: "Category A" },
  ];

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCartItems = [...cartItems];
    if (increment) {
      updatedCartItems[index].quantity++;
    } else {
      updatedCartItems[index].quantity > 1 &&
        updatedCartItems[index].quantity--;
    }
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateCategoryCount = () => {
    return new Set(cartItems.map((item) => item.category)).size;
  };

  const handleCheckout = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="nav-bar flex items-center justify-between bg-secendaryDark text-white py-3 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt="logo"
            src={logo}
            className="mr-1"
            style={{ width: "100px", height: "90px" }} // Adjust logo size if needed
          />
          NKBEATS
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
                {dummyCartItems.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img
                          src={`https://via.placeholder.com/50x50?text=${item.name}`}
                          alt={item.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {item.name}
                      </div>
                    </td>
                    <td className="px-4 py-2">${item.price}</td>
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
                  <td className="px-4 py-2 font-bold" colSpan={2}>
                    Total:
                  </td>
                  <td className="px-4 py-2 font-bold">
                    {calculateTotalItems()}
                  </td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="bg-blue-200 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Summary</h2>
            <div className="border-b-2 mb-4"></div>
            <p className="mb-2 text-lg">Total Items: {calculateTotalItems()}</p>
            <p className="mb-2 text-lg">
              Category Count: {calculateCategoryCount()}
            </p>
            <p className="mb-4 text-lg">
              Total Price: ${calculateTotalPrice()}
            </p>
            {/* <button
                            onClick={handleCheckout}
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
                        >
                            Checkout Now
                        </button> */}
            <form>
              <div className="mb-4">
                <label htmlFor="customerName" className="block mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="customerAddress" className="block mb-1">
                  Address:
                </label>
                <textarea
                  id="customerAddress"
                  name="customerAddress"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Country</label>
                <select
                  name="country"
                  className="w-full p-3 border rounded-md"
                  required
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
              >
                Checkout Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
// Existing imports...
