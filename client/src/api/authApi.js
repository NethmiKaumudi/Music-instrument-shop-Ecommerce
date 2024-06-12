// authApi.js

import axios from "axios";

export const signupUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:4000/auth/signup", {
      // Assuming your backend route is /auth/signup
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Signup failed");
  }
};
// authApi.js

export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    // localStorage.setItem("token", data.token);
    // console.log(data.token);
    return data;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};


const BASE_URL = "http://localhost:4000"; // Replace this with your backend URL

export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to add product");
  }
};

