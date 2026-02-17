import React from "react";
import { Link } from "react-router-dom";

const MobileView = ({ setIsDropdownOpen }) => {
  return (
    <>
      <div className="md:hidden border-b border-gray-700 bg-gray-800/50">
        <Link
          to="/"
          className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          onClick={() => setIsDropdownOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/pricing"
          className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          onClick={() => setIsDropdownOpen(false)}
        >
          Pricing
        </Link>
        <Link
          to="/schedule"
          className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          onClick={() => setIsDropdownOpen(false)}
        >
          Schedule
        </Link>
        <Link
          to="/contact"
          className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          onClick={() => setIsDropdownOpen(false)}
        >
          Contact
        </Link>
      </div>
    </>
  );
};

export default MobileView;
