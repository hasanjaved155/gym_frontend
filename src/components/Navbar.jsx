import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import DesktopView from "../navbarComponents/DesktopView";
import NavbarLogo from "../navbarComponents/navbarLogo";

import AvatarDropdown from "../navbarComponents/AvatarDropdown";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 dark:bg-slate-900 text-white shadow-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="w-[99vw] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <NavbarLogo />
          </div>

          {/* Desktop Menu */}
          <div>
            <DesktopView />
          </div>
          {/* Avatar & Dropdown */}
          <div>
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
