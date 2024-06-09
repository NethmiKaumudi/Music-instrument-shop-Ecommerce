import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import SignUpImage from "../assests/img/SignUp Image.png";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("customer");
  const [error, setError] = useState<string | null>(null);
  // const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Submit the form data to your backend
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-inter font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                {/* Add more roles as needed */}
              </select>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-6">{error}</div>
            )}
            <button
              className="bg-primaryDark hover:bg-secendaryDark text-white font-bold py-3 px-8 rounded mb-4 mt-3"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="hidden md:block">
          <img
            src={SignUpImage}
            alt="Sign Up"
            className="w-full h-auto mt-24 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
