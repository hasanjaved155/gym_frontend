import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DesktopView from "../navbarComponents/DesktopView";
import NavbarLogo from "../navbarComponents/NavbarLogo";
import AvatarDropdown from "../navbarComponents/AvatarDropdown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-orange-500/10 border-b border-white/5"
          : "bg-black/50 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo - With Animation */}
          <div className="flex-shrink-0 animate-fade-in">
            <NavbarLogo />
          </div>

          {/* Desktop Menu - With Stagger Animation */}
          <div className="hidden lg:flex items-center gap-1">
            <DesktopView />
          </div>

          {/* Avatar & Dropdown */}
          <div className="flex items-center gap-4">
            <AvatarDropdown />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </nav>
  );
}
