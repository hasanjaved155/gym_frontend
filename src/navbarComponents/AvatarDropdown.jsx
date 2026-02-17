import React, { useRef, useState, useEffect } from "react";
import MobileView from "./MobileView";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";
import axios from "axios";
import handleLogout from "../authComponent/handleLogout";

const AvatarDropdown = () => {
  const { isLoggedIn, logout, avatar } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <>
      <div className="relative ml-3" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 hover:ring-2 hover:ring-blue-400"
        >
          <span className="sr-only">Open user menu</span>
          <img
            src={
              avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            }
            alt="User Menu"
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-700 shadow-md hover:shadow-blue-500/50 transition-all duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
            }}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 rounded-xl bg-gray-800 border border-gray-700 shadow-2xl overflow-hidden transform origin-top-right transition-all z-50">
            {/* Mobile Menu Items */}
            <div>
              <MobileView setIsDropdownOpen={setIsDropdownOpen} />
            </div>

            {isLoggedIn ? (
              <div className="py-1">
                <button className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all duration-200 group">
                  <div className="p-1.5 mr-3 bg-gray-700 rounded-full group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                    <svg
                      className="w-4 h-4"
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
                  <span className="font-medium">Your Profile</span>
                </button>

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
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                >
                  <div className="p-1.5 mr-3 bg-red-500/10 rounded-full group-hover:bg-red-500/20 transition-colors">
                    <svg
                      className="w-4 h-4"
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
                  <span className="font-medium">
                    {loading ? "Logging out..." : "Logout"}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AvatarDropdown;
