import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import handleRegisterSubmit from "../../authComponent/handleRegister";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-3 sm:p-4 md:p-6 transition-colors duration-300">
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl dark:shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg p-5 sm:p-6 md:p-8 transition-colors duration-300">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-center mt-2 text-gray-600 dark:text-slate-400 transition-colors duration-300">
              Join us today and get started
            </p>
          </div>

          <form
            onSubmit={(e) =>
              handleRegisterSubmit(
                e,
                navigate,
                setMessage,
                setFormData,
                setLoading,
                formData,
                setPreview,
              )
            }
            className="space-y-4 sm:space-y-6"
          >
            {/* Username */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
                required
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                Profile Picture
              </label>
              <label className="flex items-center justify-center w-full px-3 sm:px-4 py-4 sm:py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 border-blue-300 dark:border-blue-500/50 bg-blue-50/50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 mb-2 transition-colors text-blue-500 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm text-center text-gray-600 dark:text-slate-300">
                    {formData.avatar
                      ? formData.avatar.name
                      : "Click to upload image"}
                  </span>
                </div>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </label>

              {/* Image Preview */}
              {preview && (
                <div className="mt-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-3 sm:p-4 rounded-lg text-center font-medium text-sm sm:text-base transition-all duration-300 ${
                  message.includes("successful")
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/50"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/50"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-600/30 dark:hover:shadow-blue-500/30"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-center mt-6 text-gray-500 dark:text-slate-400 transition-colors duration-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold transition-colors text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
