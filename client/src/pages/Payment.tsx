// import React, { FormEvent, useEffect, useState } from "react";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { StripeCardElement } from "@stripe/stripe-js";

// // interface Country {
// //   name: string;
// // }

// const MakePaymentPage: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   // const [countries, setCountries] = useState<string[]>([]); // Change to string[]

//   // useEffect(() => {
//   //   fetchCountryData();
//   // }, []);

//   // const fetchCountryData = async () => {
//   //   try {
//   //     const response = await fetch("https://restcountries.com/v3.1/all");
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch country data");
//   //     }
//   //     const data: any[] = await response.json();
//   //     const countryNames = data.map((country: any) => country.name.common);
//   //     setCountries(countryNames);
//   //   } catch (error) {
//   //     console.error("Error fetching country data:", error);
//   //   }
//   // };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement) as StripeCardElement;

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//       billing_details: {
//         name: (event.currentTarget.elements.namedItem(
//           "name"
//         ) as HTMLInputElement).value,
//         email: (event.currentTarget.elements.namedItem(
//           "email"
//         ) as HTMLInputElement).value,
//         address: {
//           country: (event.currentTarget.elements.namedItem(
//             "country"
//           ) as HTMLSelectElement).value,
//         },
//       },
//     });

//     if (error) {
//       console.log("[error]", error);
//     } else {
//       console.log("[PaymentMethod]", paymentMethod);
//       // Handle successful payment here
//     }
//   };

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-lg p-8 bg-white shadow-md rounded-md"
//         style={{ width: "80%", height: "auto" }}
//       >
//         <h1 className="text-4xl font-bold text-center mb-8">Payment</h1>

//         <div className="mb-6">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="w-full p-3 border rounded-md"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700">Name on Card</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full p-3 border rounded-md"
//             required
//           />
//         </div>
//         {/* <div className="mb-6">
//           <label className="block text-gray-700">Country</label>
//           <select
//             name="country"
//             className="w-full p-3 border rounded-md"
//             required
//           >
//             {countries.map((country, index) => (
//               <option key={index} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         <div className="mb-6">
//           <label className="block text-gray-700">Card Information</label>
//           <CardElement className="w-full p-3 border rounded-md" />
//         </div>
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

// export default MakePaymentPage;
import React, { FormEvent, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
} from "@stripe/stripe-js";

const MakePaymentPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(
      CardNumberElement
    ) as StripeCardNumberElement;
    const cardExpiryElement = elements.getElement(
      CardExpiryElement
    ) as StripeCardExpiryElement;
    const cardCvcElement = elements.getElement(
      CardCvcElement
    ) as StripeCardCvcElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: (
          event.currentTarget.elements.namedItem("name") as HTMLInputElement
        ).value,
        email: (
          event.currentTarget.elements.namedItem("email") as HTMLInputElement
        ).value,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An error occurred");
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Handle successful payment here
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-8 bg-white shadow-md rounded-md"
        style={{ width: "80%", height: "auto" }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Payment</h1>

        <div className="mb-6">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Name on Card</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Card Number</label>
          <CardNumberElement className="w-full p-3 border rounded-md" />
        </div>
        <div className="mb-6 flex">
          <div className="flex-1 mr-2">
            <label className="block text-gray-700">Expiration Date</label>
            <CardExpiryElement className="w-full p-3 border rounded-md" />
          </div>
          <div className="flex-1 ml-2">
            <label className="block text-gray-700">CVC</label>
            <CardCvcElement className="w-full p-3 border rounded-md" />
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default MakePaymentPage;
