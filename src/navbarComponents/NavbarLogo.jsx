import React from "react";
import { Link } from "react-router-dom";
import pandeyLogo from "../components/logo/pandey_gym.png";
const NavbarLogo = () => {
  return (
    <>
      <Link
        to="/"
        className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition"
      >
        <img
          src={pandeyLogo}
          alt="Pandey Gym Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-xl font-bold text-white dark:text-white sm:text-primary hidden sm:inline">
          Pandey Gym
        </span>
        <span className="text-lg font-bold text-white dark:text-white sm:hidden">
          Pandey Gym
        </span>
      </Link>
    </>
  );
};

export default NavbarLogo;
