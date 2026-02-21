import React from "react";
import { Link } from "react-router-dom";

const DesktopView = () => {
  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="text-white dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition font-semibold"
        >
          Home
        </Link>
        <Link
          to="/pricing"
          className="text-white dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition font-semibold"
        >
          Pricing
        </Link>

        <Link
          to="/contact"
          className="text-white dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition font-semibold"
        >
          Contact
        </Link>
        <Link
          to="/schedule"
          className="text-white dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition font-semibold"
        >
          Schedule
        </Link>

        <Link
          to="/feedback"
          className="text-white dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition font-semibold"
        >
          Review & Ratings
        </Link>
      </div>
    </>
  );
};

export default DesktopView;
