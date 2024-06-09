import React, { useState } from "react";
import SignUpImage from "../assests/img/SignUp Image.png";
import { signupUser } from "../api/authApi.js";
import Swal from "sweetalert2";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("customer");
  const [nameError, setNameError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateUsername = (username: string) => {
    if (!username.trim()) {
      setUsernameError("Username is required");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else {
      setEmailError("");
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    }
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    }
  };

  const isFormValid = () => {
    const isNameValid = validateName(name);
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
  
    return isNameValid && isUsernameValid && isEmailValid && isPasswordValid;
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };
  
  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };
  
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const userData = { name, username, email, password, role };
      const response = await signupUser(userData);

      await Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "You have successfully signed up.",
      });

      console.log("Signup successful:", response);
      window.location.href = "/login";
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);

      await Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: "An error occurred while signing up. Please try again later.",
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
              <label className="block text-gray-700 text-inter font-bold mb-2" htmlFor="name">Name</label>
              <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} />
              {nameError && <div className="text-red-500 text-sm">{nameError}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-inter font-bold mb-2" htmlFor="username">Username</label>
              <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} onChange={(e) => handleUsernameChange(e.target.value)} />
              {usernameError && <div className="text-red-500 text-sm">{usernameError}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-inter font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} />
              {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-inter font-bold mb-2" htmlFor="password">Password</label>
              <input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
              {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-inter font-bold mb-2" htmlFor="role">Role</label>
              <select className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <div className="text-red-500 text-sm mb-6">{error}</div>}
            <button className="bg-primaryDark hover:bg-secondaryDark text-white font-bold py-3 px-8 rounded mb-4 mt-3" type="submit" disabled={!isFormValid()}>
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

