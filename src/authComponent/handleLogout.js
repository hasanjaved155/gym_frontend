import axios from "axios";

const handleLogout = async ({
  setLoading,
  setIsDropdownOpen,
  navigate,
  logout,
}) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Important for sending cookies
      },
    );

    console.log("✅ Logout Success:", response?.data);
  } catch (error) {
    console.error("❌ Logout Error:", error.response?.data || error.message);
    // Even if the server returns 401 (Token missing), we should proceed to logout locally
  } finally {
    logout();

    // Clear localStorage
    localStorage.removeItem("user");

    setIsDropdownOpen(false);

    // ✅ Dispatch event to ensure navbar updates
    window.dispatchEvent(new Event("loginStatusChanged"));

    // Redirect to home
    navigate("/login");
    setLoading(false);
  }
};

export default handleLogout;
