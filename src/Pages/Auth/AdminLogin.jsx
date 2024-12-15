import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("savedPassword") || ""
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    try {
      const response = await axios.post(
        "https://sunny.napver.com/api/admin/login",
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.success(response.data.message, { position: "top-right" });
      navigate("/dashboard");
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
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-violet-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-violet-700 text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-violet-700 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-violet-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-600">
                Remember me
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="w-full bg-violet-700 text-white py-2 rounded-md hover:bg-violet-600 transition duration-200"
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
          <div>
            <p className="text-gray-500">
              username: refat@gmail.com || password:12345678
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
