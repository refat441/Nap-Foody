import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // for blcak slash
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate(-1);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sunny.napver.com/api/superadmin/login",
        { email, password }
      );

      console.log("API Response:", response.data);

      // Save token to localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.success(response.data.message, { position: "top-right" });

      // Redirect to SuperDashboard after successful login
      navigate("/dashboard/superdashboard");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unknown error occurred", { position: "top-right" });
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
