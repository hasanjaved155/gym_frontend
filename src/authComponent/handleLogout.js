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

    logout();

    console.log("✅ Logout Success:", response.data);

    // Clear localStorage
    localStorage.removeItem("user");

    // Update login status
    // setIsLoggedIn(false);
    setIsDropdownOpen(false);

    // ✅ Dispatch event to ensure navbar updates
    window.dispatchEvent(new Event("loginStatusChanged"));

    // Redirect to home
    navigate("/login");
  } catch (error) {
    console.error("❌ Logout Error:", error.response?.data || error.message);
    alert("Logout failed! Please try again.");
  } finally {
    setLoading(false);
  }
};

export default handleLogout;
