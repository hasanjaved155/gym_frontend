import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import handleResetPasswordSubmit from "../../authComponent/handleResetPassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-3 sm:p-4 md:p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl dark:shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg p-5 sm:p-6 md:p-8 transition-colors duration-300">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white transition-colors duration-300">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-center mt-2 text-gray-600 dark:text-slate-400 transition-colors duration-300">
            Enter your new password below
          </p>
        </div>

        <form
          onSubmit={(e) =>
            handleResetPasswordSubmit(
              e,
              password,
              confirmPassword,
              id,
              token,
              navigate,
              setMessage,
              setLoading,
            )
          }
          className="space-y-4 sm:space-y-6"
        >
          {/* New Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors duration-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-200"
              required
            />
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 sm:p-4 rounded-lg text-center font-medium text-sm sm:text-base transition-all duration-300 ${
                message.toLowerCase().includes("success")
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/50"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/50"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-600/30 dark:hover:shadow-blue-500/30"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
