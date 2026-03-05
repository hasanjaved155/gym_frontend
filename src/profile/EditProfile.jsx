import React, { useState, useEffect } from "react";
import { useAuth } from "../contextApi/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user?.username || "");
      setPhonenumber(user?.phonenumber || "");
      setPreview(user?.avatar);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", user?.email);
      data.append("phonenumber", phonenumber);
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const response = await axios.patch("/api/v1/users/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.data) {
        setUser(response.data.data);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user),
        );
      }

      toast.success("Profile updated successfully!");
      setMessage("Profile updated successfully! ✅");
      setTimeout(() => {
        navigate("/user-profile");
      }, 1500);
    } catch (error) {
      console.error("Update failed", error);
      const errorMsg =
        error.response?.data?.message || "Failed to update profile. ❌";
      toast.error(errorMsg);
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen md:w-[95rem] bg-black text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Edit Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Update your personal details and preferences
          </p>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Upload Section */}
              <div
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative group/avatar mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover/avatar:opacity-100 transition-all"></div>
                  <div className="relative w-36 h-36 rounded-full border-4 border-gray-900 bg-gray-800 overflow-hidden shadow-xl">
                    <img
                      src={
                        preview ||
                        `https://ui-avatars.com/api/?name=${username}&background=FF6B35&color=fff`
                      }
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${username}&background=FF6B35&color=fff`;
                      }}
                    />
                  </div>
                </div>

                <label
                  htmlFor="avatar-upload"
                  className="group/btn cursor-pointer relative px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 inline-flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  Change Photo
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <p className="text-xs text-gray-500 mt-3 text-center">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Username */}
                <div
                  className="group/input animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/10 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Enter your username"
                      required
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-orange-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Phone Number */}
                <div
                  className="group/input animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                      className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/10 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-orange-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div
                  className="group/input animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                      Email Address
                    </span>
                    <span className="text-xs font-normal text-gray-500 uppercase">
                      (Cannot be changed)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 placeholder-gray-600 cursor-not-allowed opacity-70"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Alert */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-center font-medium text-sm border animate-fade-in ${
                    message.includes("successfully")
                      ? "bg-green-600/20 text-green-300 border-green-500/50"
                      : "bg-red-600/20 text-red-300 border-red-500/50"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div
                className="flex gap-4 pt-6 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/user-profile")}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-black rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
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

export default EditProfile;
