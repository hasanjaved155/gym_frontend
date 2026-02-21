import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleForgetPasswordSubmit from "../../authComponent/handleForgetPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 md:p-6 transition-colors duration-300">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg p-5 sm:p-6 md:p-8 transition-colors duration-300">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white transition-colors duration-300">
            Forgot Password
          </h1>
          <p className="text-xs sm:text-sm text-center mt-2 text-slate-400 transition-colors duration-300">
            Enter your email to reset your password
          </p>
        </div>

        <form
          onSubmit={(e) =>
            handleForgetPasswordSubmit(e, email, setEmail, navigate)
          }
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2 transition-colors duration-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-lg bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-center mt-6 text-slate-400 transition-colors duration-300">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold transition-colors text-blue-400 hover:text-blue-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
