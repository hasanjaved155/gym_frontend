import React, { useState, useEffect } from "react";
import { useAuth } from "../contextApi/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const { user, login } = useAuth();
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
      data.append("email", user?.email); // Include email for backend validation
      data.append("phonenumber", phonenumber);
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      // Single route for updating profile
      await axios.patch("/api/v1/users/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 3. Fetch updated user data to refresh context
      const response = await axios.get("/api/v1/users/auth-status");

      // Update Auth Context
      if (response?.data?.data) {
        login(response.data.data);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user),
        );
      }

      setMessage("Profile updated successfully! ✅");
      setTimeout(() => {
        navigate("/user-profile");
      }, 1500);
    } catch (error) {
      console.error("Update failed", error);
      setMessage(
        error.response?.data?.message || "Failed to update profile. ❌",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
          <p className="text-slate-400 mt-2">Update your personal details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-600 mb-4 shadow-lg">
              <img
                src={
                  preview ||
                  `https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`
                }
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full text-sm font-medium transition-all hover:ring-2 hover:ring-slate-500 hover:ring-offset-2 hover:ring-offset-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
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
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Enter phone number"
              />
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address{" "}
                <span className="text-xs text-slate-500">
                  (Cannot be changed)
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-center font-medium text-sm ${
                message.includes("success")
                  ? "bg-green-900/30 text-green-300 border border-green-500/50"
                  : "bg-red-900/30 text-red-300 border border-red-500/50"
              }`}
            >
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/user-profile")}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
