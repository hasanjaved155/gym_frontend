// NavbarLogo.jsx
import React from "react";
import { Link } from "react-router-dom";
import pandeyLogo from "../components/logo/pandey_gym.png";

const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 sm:gap-3 group transition-all duration-300"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <img
          src={pandeyLogo}
          alt="Pandey Gym Logo"
          className="h-10 sm:h-12 w-10 sm:w-12 object-contain relative rounded-lg"
        />
      </div>
      <div className="block">
        <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
          Pandey Gym
        </h2>
        <p className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors">
          Transform Your Body
        </p>
      </div>
    </Link>
  );
};

export default NavbarLogo;
