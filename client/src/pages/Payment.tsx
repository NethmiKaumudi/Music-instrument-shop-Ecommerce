import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import logo from '../assests/img/nk music logo.png'; 
import { IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { IoLogOutOutline } from 'react-icons/io5';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, cart }: { formData: any; cart: CartItem[] } = location.state || { formData: null, cart: [] };

  const [cartItems] = useState<CartItem[]>(cart);
  const [formDataState, setFormDataState] = useState({
    name: formData?.name || '',
    address: formData?.address || '',
    contactNumber: formData?.contactNumber || '',
  });
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Navigate to login page
  };
  const handlePayment = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      const response = await fetch('http://localhost:4000/orders/placeOrder', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify({
          name: formDataState.name,
          address: formDataState.address,
          contactNumber: formDataState.contactNumber,
          cartItems: cartItems.map(item => ({
            _id: item._id,
            quantity: item.quantity,
          })),
          totalAmount: calculateTotalPrice(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const responseData = await response.json();
      await Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `Your payment has been processed successfully. Order ID: ${responseData.orderId}`,
      });

      
    } catch (error) {
      console.error('Error processing payment:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'There was an error processing your payment. Please try again.',
      });
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="nav-bar flex items-center justify-between bg-secendaryDark text-white py-2 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt="logo"
            src={logo}
            className="mr-1"
            style={{ width: '100px', height: '90px' }}
          />
          NKBEATS
        </Link>
        <button
        className="flex items-center bg-secendary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout} 
      >
        <IoLogOutOutline className="mr-2" style={{ borderRadius: '50%' }} /> Log Out
      </button>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Box: Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 p-2 mb-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold">RS: {item.price}</span>
                    <div className="flex items-center space-x-2">
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <hr className="border-gray-300" />
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">RS: {calculateTotalPrice()}</span>
              </div>
            </div>
          </div>

          {/* Right Box: Payment Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={formDataState.name}
                onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                required
              />
              <label className="block mb-2">Address:</label>
              <textarea
                value={formDataState.address}
                onChange={(e) => setFormDataState({ ...formDataState, address: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full resize-none"
                rows={4}
                required
              />
              <label className="block mb-2">Contact Number:</label>
              <input
                type="tel"
                value={formDataState.contactNumber}
                onChange={(e) => setFormDataState({ ...formDataState, contactNumber: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                required
              />
              {/* Stripe Checkout component */}
              <StripeCheckout
                stripeKey="pk_test_51Oqpc6DDs5wFiqTUqxEnnoVTjDMMCjMgbCnSwxKmVcHMCT8rLXO4wL7nTptnarrKOUMw4XRe1RNmvTBfWgC3t3mp00rTvqUUAW" // Replace with your Stripe publishable key
                token={handlePayment}
                name="NKBEATS"
                amount={calculateTotalPrice() * 100}
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
