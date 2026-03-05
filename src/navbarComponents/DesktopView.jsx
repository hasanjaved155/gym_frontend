// DesktopView.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DesktopView = () => {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    // Map routes to nav link IDs
    const routeMap = {
      "/": "home",
      "/pricing": "pricing",
      "/schedule": "schedule",
      "/contact": "contact",
      "/feedback": "reviews",
    };

    // Get the current route and set active link
    const currentPath = location.pathname;
    const activeId = routeMap[currentPath] || "home";
    setActiveLink(activeId);
  }, [location.pathname]);

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "pricing", label: "Pricing", path: "/pricing" },
    { id: "schedule", label: "Schedule", path: "/schedule" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "reviews", label: "Reviews", path: "/feedback" },
  ];

  return (
    <div className="flex items-center gap-2">
      {navLinks.map((link, index) => (
        <Link
          key={link.id}
          to={link.path}
          onClick={() => setActiveLink(link.id)}
          className="group relative px-4 py-2 transition-all duration-300"
          style={{ animation: `slideDown 0.5s ease-out ${index * 0.1}s both` }}
        >
          {/* Background Gradient */}
          <div
            className={`absolute inset-0 rounded-lg transition-all duration-300 ${
              activeLink === link.id
                ? "bg-gradient-to-r from-red-600/30 to-orange-600/30"
                : "bg-white/0 group-hover:bg-white/10"
            }`}
          ></div>

          {/* Text */}
          <span
            className={`relative text-sm font-semibold transition-all duration-300 ${
              activeLink === link.id
                ? "text-orange-400"
                : "text-gray-300 group-hover:text-white"
            }`}
          >
            {link.label}
          </span>

          {/* Bottom Border Animation */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
              activeLink === link.id ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></div>
        </Link>
      ))}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DesktopView;
