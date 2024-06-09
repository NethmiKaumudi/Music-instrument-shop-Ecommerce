// authApi.js

export const signupUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/auth/signup', { // Assuming your backend route is /auth/signup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Signup failed');
    }
  };
  // auth.js
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
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      // Save token to local storage
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw new Error("Login failed");
    }
  };
  
  export const logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
  };
  
  export const isLoggedIn = () => {
    // Check if token exists in local storage
    return !!localStorage.getItem("token");
  };
  