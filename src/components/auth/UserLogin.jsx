import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthContext";
import handleLoginSubmit from "../../authComponent/handleLogin";

export default function UserLogin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 md:p-6 transition-colors duration-300">
        <div className="bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg p-5 sm:p-6 md:p-8 transition-colors duration-300">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white transition-colors duration-300">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-center mt-2 text-slate-400 transition-colors duration-300">
              Login and get started
            </p>
          </div>

          <form
            onSubmit={(e) =>
              handleLoginSubmit(
                e,
                login,
                navigate,
                setMessage,
                setFormData,
                setLoading,
                formData,
              )
            }
            className="space-y-4 sm:space-y-6"
          >
            {/* Username */}

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-3 sm:p-4 rounded-lg text-center font-medium text-sm sm:text-base transition-all duration-300 ${
                  message.includes("successful")
                    ? "bg-green-900/30 text-green-300 border border-green-500/50"
                    : "bg-red-900/30 text-red-300 border border-red-500/50"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-xs sm:text-sm text-end mt-6 text-slate-400 transition-colors duration-300">
              <Link
                to="/forget-password"
                className="font-semibold transition-colors text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base mt-2 sm:mt-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-center mt-6 text-slate-400 transition-colors duration-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold transition-colors text-blue-400 hover:text-blue-300"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
