// AvatarDropdown.jsx
import React, { useRef, useState, useEffect } from "react";
import MobileView from "./MobileView";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import handleLogout from "../authComponent/handleLogout";
import { useAuth } from "../contextApi/useAuth";

const AvatarDropdown = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const adminMail = "hasanjaved155@gmail.com";
  const adminMail2 = "pandeya0760@gmail.com";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative group flex rounded-full focus:outline-none transition-all duration-300 hover:scale-110"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Avatar Image */}
        <img
          src={
            user?.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          }
          alt="User Menu"
          className="relative h-7 w-7 rounded-full object-cover border-2 border-gray-600 group-hover:border-orange-500 shadow-lg group-hover:shadow-orange-500/60 transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff";
          }}
        />

        {/* Online Status Indicator */}
        {isLoggedIn && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-3  w-56 h-[35rem] scroll-auto overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 shadow-2xl overflow-hidden transform origin-top-right z-50 backdrop-blur-xl hover:border-white/20 transition-all duration-300 animate-dropdown-in"
          style={{ animation: "dropdownSlide 0.3s ease-out" }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-b border-white/10 px-6 py-6">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
              👤 Account
            </p>
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/10">
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff"
                  }
                  alt="User"
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 shadow-lg"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">
                    {user?.username || "User"}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-300 text-sm">Welcome Guest</p>
            )}
          </div>

          {/* Mobile View */}
          <div className="lg:hidden border-b border-white/10">
            <MobileView setIsDropdownOpen={setIsDropdownOpen} />
          </div>

          {/* Menu Items */}
          {isLoggedIn ? (
            <div className="p-4 space-y-2">
              {/* Admin Section */}
              {(user?.email === adminMail2 || user?.email === adminMail) && (
                <div className="space-y-2 pb-3 border-b border-white/10 mb-2">
                  <p className="px-4 py-2 text-xs font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text uppercase tracking-widest">
                    🛠️ Admin Panel
                  </p>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 hover:border-blue-400/50 hover:from-blue-600/20 hover:to-cyan-600/20 transition-all duration-300">
                      <div className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-xl group-hover:from-blue-600/50 group-hover:to-cyan-600/50 transition-all duration-300 flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4V3"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm">
                            Dashboard
                          </p>
                          <p className="text-xs text-gray-400">
                            Manage gym & analytics
                          </p>
                        </div>
                        <svg
                          className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* User Profile */}
              <Link
                to="/user-profile"
                onClick={() => setIsDropdownOpen(false)}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/30 hover:border-orange-400/50 hover:from-orange-600/20 hover:to-red-600/20 transition-all duration-300">
                  <div className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-xl group-hover:from-orange-600/50 group-hover:to-red-600/50 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-sm">
                        Your Profile
                      </p>
                      <p className="text-xs text-gray-400">
                        View & edit your details
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={() =>
                  handleLogout({
                    setLoading,
                    setIsDropdownOpen,
                    navigate,
                    logout,
                  })
                }
                disabled={loading}
                className="w-full mb-8 block group pt-2 border-t border-white/10 mt-2"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/30 hover:border-red-400/50 hover:from-red-600/20 hover:to-red-700/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-600/20">
                  <div className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-600/30 to-red-700/30 rounded-xl group-hover:from-red-600/50 group-hover:to-red-700/50 transition-all duration-300 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-red-400 text-sm">
                        {loading ? "Logging out..." : "Logout"}
                      </p>
                      <p className="text-xs text-red-300/60">
                        {loading
                          ? "Please wait..."
                          : "Sign out of your account"}
                      </p>
                    </div>
                    {loading && (
                      <svg
                        className="w-5 h-5 text-red-400 animate-spin flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {/* Login Button */}
              <Link
                to="/login"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-gray-300 hover:text-white bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 rounded-xl transition-all duration-200 gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1"
                  ></path>
                </svg>
                Sign In
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl shadow-lg shadow-orange-600/50 hover:shadow-orange-500/60 transition-all duration-200 transform hover:-translate-y-0.5 gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM9 19a7 7 0 1114 0"
                  ></path>
                </svg>
                Start Free Trial
              </Link>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-900 text-gray-500">or</span>
                </div>
              </div>

              {/* Contact Support */}
              <a
                href="tel:+917007734812"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-gray-300 hover:text-white bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 rounded-xl transition-all duration-200 gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Call Us
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-white/10 px-6 py-3 bg-white/5 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Pandey Gym • All rights reserved
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
          

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default AvatarDropdown;
