import React from "react";
import { useAuth } from "../contextApi/useAuth";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();

  // Calculate Attendance (Days since joining)
  const joinDateStr = user?.joinDate;
  const joinDate = joinDateStr ? new Date(joinDateStr) : null;

  // Calculate Next Payment (Monthly cycle from join date)
  let nextPaymentDate = null;
  let remainingDays = 0;
  if (joinDate) {
    nextPaymentDate = new Date(joinDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    const today = new Date();
    while (nextPaymentDate < today) {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }
    remainingDays = Math.ceil(
      (nextPaymentDate - today) / (1000 * 60 * 60 * 24),
    );
  }

  return (
    <section className="relative min-h-screen md:w-[95rem] bg-black text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Card */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
            {/* Banner */}
            <div className="h-40 sm:h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-orange-600/30 to-yellow-600/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 sm:px-10 pb-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 sm:-mt-32 mb-10 relative z-10">
                {/* Avatar */}
                <div className="flex justify-center sm:justify-start">
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover/avatar:opacity-100 transition-all"></div>
                    <div className="relative w-32 sm:w-40 h-32 sm:h-40 rounded-full border-4 border-gray-900 bg-gray-800 overflow-hidden">
                      <img
                        src={
                          user?.avatar ||
                          `https://ui-avatars.com/api/?name=${user?.username}&background=FF6B35&color=fff`
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${user?.username}&background=FF6B35&color=fff`;
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
                    {user?.username || "User"}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-orange-400 font-bold text-lg">
                      Active Member
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>

                {/* Edit Button */}
                <Link to="/edit-profile" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                </Link>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* Personal Information */}
                <div
                  className="group/card animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 p-8 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300"></div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-lg">
                          <span className="text-2xl">👤</span>
                        </div>
                        Personal Information
                      </h3>

                      <div className="space-y-5">
                        {/* Email */}
                        <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            Email Address
                          </label>
                          <p className="text-white font-semibold truncate">
                            {user?.email || "N/A"}
                          </p>
                        </div>

                        {/* Phone */}
                        <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            Phone Number
                          </label>
                          <p className="text-white font-semibold">
                            {user?.phonenumber || "Not provided"}
                          </p>
                        </div>

                        {/* Member Since */}
                        <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            Member Since
                          </label>
                          <p className="text-white font-semibold">
                            {joinDate
                              ? joinDate.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Status */}
                <div
                  className="group/card animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 p-8 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300"></div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-red-600/30 to-orange-600/30 rounded-lg">
                          <span className="text-2xl">💪</span>
                        </div>
                        Membership Status
                      </h3>

                      <div className="space-y-4">
                        {/* Status */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                              Account Status
                            </label>
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                                user?.active !== false
                                  ? "bg-green-600/30 text-green-400 border border-green-500/50"
                                  : "bg-red-600/30 text-red-400 border border-red-500/50"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${user?.active !== false ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                              ></span>
                              {user?.active !== false ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>

                        {/* Remaining Days */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                              Remaining Days
                            </label>
                            <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                              {remainingDays}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-700 rounded-full mt-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                              style={{
                                width: `${Math.max(0, Math.min(100, (remainingDays / 30) * 100))}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Next Payment */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                              Next Payment
                            </label>
                            <span className="text-white font-bold">
                              {nextPaymentDate
                                ? nextPaymentDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
};

export default UserProfile;
