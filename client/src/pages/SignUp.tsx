import React, { useState } from "react";
import SignUpImage from "../assests/img/SignUp Image.png";
import { signupUser } from "../api/authApi.js";
import Swal from "sweetalert2";

interface FormState {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const initialFormState: FormState = {
  name: "",
  username: "",
  email: "",
  password: "",
  role: "customer",
};

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({
    name: false,
    username: false,
    email: false,
    password: false,
    role: false,
  });
  
  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    
    // Mark the field as touched
    setTouchedFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };
  
  const validateForm = () => {
    const { name, username, email, password } = formState;
    const errors: { [key: string]: string } = {};
  
    // Check if the current field is touched before validating
    if (touchedFields.name) {
      if (!name.trim()) {
        errors.name = "Name is required";
      } else if (name.trim().split(" ").length < 2) {
        errors.name = "Name must contain at least two parts separated by a space";
      } else if (name.trim().length < 5) {
        errors.name = "Name must be at least 5 characters long";
      }
    }
  
    if (touchedFields.username) {
      if (!username.trim()) {
        errors.username = "Username is required";
      } else if (username.trim().length < 5) {
        errors.username = "Username must be at least 5 characters long";
      }
    }
  
    if (touchedFields.email) {
      if (!email.trim()) {
        errors.email = "Email is required";
      } else {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          errors.email = "Invalid email address";
        }
      }
    }
  
    if (touchedFields.password) {
      if (!password.trim()) {
        errors.password = "Password is required";
      } else {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
          errors.password =
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
        }
      }
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await signupUser(formState);

      await Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "You have successfully signed up.",
      });

      console.log("Signup successful:", response);
      // Reset form and errors after successful submission
      setFormState(initialFormState);
      setFormErrors({});
      setError(null);
      window.location.href = "/login"; // Redirect to Login page
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed. Please try again.";

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setError(errorMessage);

      await Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className="max-w-6xl w-full p-2 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center p-4 md:p-8">
          <h2 className="text-4xl text-inter mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-inter font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {formErrors.name && (
                <div className="text-red-500 text-sm">{formErrors.name}</div>
              )}
            </div>
            {/* Rest of your form code... */}
            {/* ... */}
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
                value={formState.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
              {formErrors.username && (
                <div className="text-red-500 text-sm">
                  {formErrors.username}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-inter font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {formErrors.email && (
                <div className="text-red-500 text-sm">{formErrors.email}</div>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-inter font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700
    leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={formState.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {formErrors.password && (
                <div className="text-red-500 text-sm">
                  {formErrors.password}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-inter font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={formState.role}
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <div className="text-red-500 text-sm mb-6">{error}</div>}
            <button
              className="bg-primaryDark hover:bg-secondaryDark text-white font-bold py-3 px-8 rounded mb-4 mt-3"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="hidden md:block">
          <img src={SignUpImage} alt="Sign Up" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
