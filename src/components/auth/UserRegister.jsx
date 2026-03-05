import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleRegisterSubmit from "../../authComponent/handleRegister";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
    joinDate: "",
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
    <section className="relative min-h-screen md:w-[95rem] flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-2xl px-4 sm:px-6 relative z-10 animate-fade-in">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl -z-10"></div>

        {/* Main Card */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover:border-white/40 transition-all duration-500">
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div
              className="mb-8 text-center animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💪</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Join Pandey Gym
              </h1>
              <p className="text-gray-400 text-sm">
                Transform your body and mind. Start your fitness journey today!
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
              className="space-y-6"
            >
              {/* Username Field */}
              <div
                className="group animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    👤
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose your username"
                    className="w-full pl-12 pr-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div
                className="group animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    ✉️
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div
                className="group animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    🔑
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Join Date Field */}
              <div
                className="group animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Join Date
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    📅
                  </div>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white/10 placeholder-gray-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Avatar Upload */}
              <div
                className="group animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Profile Picture
                </label>
                <label className="relative flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group">
                  <div className="flex flex-col items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                      />
                    ) : (
                      <>
                        <div className="text-4xl mb-3">🖼️</div>
                        <span className="text-sm text-center text-gray-300 font-semibold">
                          Click to upload profile picture
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </>
                    )}
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
              </div>

              {/* Status Message */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-center font-semibold text-sm border animate-fade-in ${
                    message.includes("successful")
                      ? "bg-green-600/20 border-green-500/50 text-green-400"
                      : "bg-red-600/20 border-red-500/50 text-red-400"
                  }`}
                  style={{ animationDelay: "0.7s" }}
                >
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-2 mt-8 ${
                  loading
                    ? "bg-gray-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:-translate-y-1 shadow-lg shadow-orange-600/50 hover:shadow-orange-500/60 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-black/40 text-gray-400">
                  Already a member?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <p className="text-gray-400 text-sm">
                Have an account?{" "}
                <a
                  href="/login"
                  className="font-bold text-orange-400 hover:text-orange-300 transition-colors duration-300"
                >
                  Sign in here
                </a>
              </p>
            </div>

            {/* Features */}
            <div
              className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="text-xs text-gray-400">
                <span className="text-xl block mb-1">🔒</span>
                Secure
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-xl block mb-1">📱</span>
                Mobile Ready
              </div>
              <div className="text-xs text-gray-400">
                <span className="text-xl block mb-1">⚡</span>
                Fast Access
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p
          className="text-center text-gray-400 text-xs mt-6 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          © 2024 Pandey Gym. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
