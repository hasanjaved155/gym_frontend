import React from "react";
import { useAuth } from "../contextApi/AuthContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();
  const [active, setActive] = React.useState(false);

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
      setActive(true);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }
    remainingDays = Math.ceil(
      (nextPaymentDate - today) / (1000 * 60 * 60 * 24),
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Header */}
        <div className="relative px-6 sm:px-10 pb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-6 sm:mb-8 gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full p-1 bg-slate-800">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff`
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-slate-800 bg-slate-700"
                />
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center sm:text-left flex-1 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {user?.username}
              </h1>
              <p className="text-blue-400 font-medium text-lg">Gym Member</p>
            </div>

            {/* Edit Button (Visual only) */}
            <Link to="/edit-profile">
              <div className="mb-4 sm:mb-0">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105">
                  Edit Profile
                </button>
              </div>
            </Link>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Personal Information */}
            <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-400">👤</span> Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-1">
                    Email Address
                  </label>
                  <p className="text-slate-200 font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">
                    Phone Number
                  </label>
                  <p className="text-slate-200 font-medium">
                    {user?.phonenumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">
                    Member Since
                  </label>
                  <p className="text-slate-200 font-medium">
                    {joinDate
                      ? joinDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Stats / Membership Info (Placeholder) */}
            <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-400">💪</span> Membership Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Plan</span>
                  <span className="text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Remaining Days</span>
                  <span className="text-white font-bold">
                    {remainingDays} Days
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Next Payment</span>
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
  );
};

export default UserProfile;
