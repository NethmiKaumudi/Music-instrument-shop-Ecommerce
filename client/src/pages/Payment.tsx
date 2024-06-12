import React, { FormEvent, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

// Define an interface for the country data structure
interface Country {
  name: {
    common: string;
  };
}

const MakePaymentPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    // Fetch country data when the component mounts
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.eu/rest/v1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch country data");
      }
      const data: Country[] = await response.json(); // Add type annotation here
      // Extract country names from the data
      const countryNames = data.map((country: Country) => country.name.common); // Add type annotation here
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: (event.currentTarget.elements.namedItem(
          "name"
        ) as HTMLInputElement).value,
        email: (event.currentTarget.elements.namedItem(
          "email"
        ) as HTMLInputElement).value,
        address: {
          country: (event.currentTarget.elements.namedItem(
            "country"
          ) as HTMLSelectElement).value,
        },
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Handle successful payment here
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-1/2 bg-gray-200">
        <div className="bg-secendary p-4 rounded-md shadow-md">
          <div className="mb-8 text-3xl font-bold">Total Price: 200</div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-4 bg-white shadow-md rounded-md"
        >
          <h1 className="text-4xl font-bold text-center">Payment</h1>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name on Card</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <select
              name="country"
              className="w-full p-2 border rounded-md"
              required
            >
              {/* Render country options dynamically */}
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Card Information</label>
            <CardElement className="w-full p-2 border rounded-md" />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePaymentPage;
