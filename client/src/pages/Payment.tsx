// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentPage: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const location = useLocation(); // Without generic type
//   const formData = location.state?.formData || {};
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       // Dummy API call to backend to place order
//       const orderData = await placeOrder(formData);

//       // Create a PaymentMethod using the card element from Stripe Elements
//       const cardElement = elements.getElement(CardElement);
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement!,
//         billing_details: {
//           name: formData.name, // Assuming formData contains name and email
//           email: formData.email,
//         },
//       });

//       if (error) {
//         throw new Error(error.message ?? 'Failed to create payment method');
//       }

//       // Simulate payment success (replace with actual payment handling logic)
//       await simulatePayment(orderData.id);

//       // Handle success scenario (e.g., show confirmation message)
//       console.log('Payment successful');
//     } catch (error: any) { // Explicitly type 'error' to 'any' or 'Error'
//       setErrorMessage(error.message ?? 'Error processing payment. Please try again.');
//     }
//   };

//   const placeOrder = async (formData: any) => {
//     // Dummy API call to backend to place order
//     const response = await fetch('your_backend_url/placeOrder', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to place order');
//     }
//     return await response.json();
//   };

//   const simulatePayment = async (orderId: string) => {
//     // Dummy API call to backend to simulate payment
//     const response = await fetch(`your_backend_url/payments/${orderId}/process`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 100, currency: 'USD' }), // Example payment data
//     });
//     if (!response.ok) {
//       throw new Error('Failed to process payment');
//     }
//     return await response.json();
//   };

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <form
//         onSubmit={handlePayment}
//         className="max-w-lg p-8 bg-white shadow-md rounded-md"
//         style={{ width: '80%', height: 'auto' }}
//       >
//         <h1 className="text-4xl font-bold text-center mb-8">Payment</h1>

//         {/* Display order summary or relevant information here */}
//         <div className="mb-6">
//           <label className="block text-gray-700">Order Summary:</label>
//           <div className="mt-2">
//             {/* Display order details */}
//             <p><strong>Order Total:</strong> $100</p>
//             {/* Replace with actual order details */}
//           </div>
//         </div>

//         {/* Stripe Card Element */}
//         <div className="mb-6">
//           <label className="block text-gray-700">Card Details:</label>
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }}
//             className="p-3 border rounded-md"
//           />
//         </div>

//         {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        
//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-500 text-white rounded-md"
//         >
//           Pay
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assests/img/nk music logo.png'; // Adjusted import path for logo
import { IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import StripeProvider from '../api/stripePovider'; // Adjust path as per your actual file structure

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cart }: { formData: any; cart: CartItem[] } = location.state || { formData: null, cart: [] };

  const [cartItems, setCartItems] = useState<CartItem[]>(cart);
  const [formDataState, setFormDataState] = useState({
    name: formData?.name || '',
    address: formData?.address || '',
    contactNumber: formData?.contactNumber || '',
  });

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCart = [...cartItems];
    if (increment) {
      updatedCart[index].quantity++;
    } else {
      updatedCart[index].quantity > 1 && updatedCart[index].quantity--;
    }
    setCartItems(updatedCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async (token: Token) => {
    try {
      const response = await fetch('http://localhost:4000/orders/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      navigate('/payment-success');
    } catch (error) {
      console.error('Error processing payment:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'There was an error processing your payment. Please try again.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="nav-bar flex items-center justify-between bg-secondaryDark text-white py-2 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt="logo"
            src={logo}
            className="mr-1"
            style={{ width: '100px', height: '90px' }}
          />
          NKBEATS
        </Link>
        <Link
          to="/product-list"
          state={{
            cartItems: cartItems.reduce(
              (acc, item) => ({ ...acc, [item._id]: item }),
              {}
            ),
          }}
          className="ml-4 bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          Back to Products
        </Link>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Box: Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className={index % 2 === 0 ? 'bg-gray-100 p-2 mb-2' : 'bg-white p-2 mb-2'}
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
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 mt-2"
                >
                  <IonIcon icon={trash} />
                </button>
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
              <StripeCheckout
                stripeKey="pk_test_51Oqpc6DDs5wFiqTUqxEnnoVTjDMMCjMgbCnSwxKmVcHMCT8rLXO4wL7nTptnarrKOUMw4XRe1RNmvTBfWgC3t3mp00rTvqUUAW" // Replace with your Stripe publishable key
                token={handlePayment}
                name="NKBEATS"
                amount={calculateTotalPrice() * 100} // Amount in cents
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
