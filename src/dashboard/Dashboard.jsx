import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contextApi/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-24 right-4 z-30 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg min-h-screen fixed left-0 top-20 z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-3">
          <img
            src={
              user?.avatar ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <h2 className="text-lg font-bold text-white truncate">
            Welcome!! {user.username?.split(" ")[1]}
          </h2>
        </div>
        <nav className="mt-6 space-y-2 px-3">
          <NavLink
            to="/dashboard"
            end
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-3 text-gray-700 font-medium rounded-lg transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-blue-600 shadow-md"
                  : "border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            📊 Overview
          </NavLink>

          <NavLink
            to="/dashboard/active-members"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-3 text-gray-700 font-medium rounded-lg transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-blue-600 shadow-md"
                  : "border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            ✅ Active Members
          </NavLink>
          <NavLink
            to="/dashboard/expiring-soon"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-3 text-gray-700 font-medium rounded-lg transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-yellow-50 text-yellow-600 border-yellow-600 shadow-md"
                  : "border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            ⏰ Expiring Soon
          </NavLink>
          <NavLink
            to="/dashboard/expired-members"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-3 text-gray-700 font-medium rounded-lg transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-red-50 text-red-600 border-red-600 shadow-md"
                  : "border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            ❌ Expired Members
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
