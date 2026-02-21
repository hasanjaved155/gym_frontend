import axios from "axios";

const handleLoginSubmit = async (
  e,
  login,
  navigate,
  setMessage,
  setFormData,
  setLoading,
  formData,
) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const response = await axios?.post("/api/v1/users/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    login(response?.data?.data);

    console.log("✅ Login Success:", response?.data?.data?.user);
    setMessage("Login successful! ✅");
    setFormData({
      email: "",
      password: "",
    });
    // Store user data if needed
    if (response?.data) {
      // console.log("Storing user data in localStorage:", response.data);
      localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
      navigate("/");
    }
  } catch (error) {
    console.log("❌ Login Error:", error.response?.data || error.message);
    const errorMsg = error.response?.data?.message || "Login failed! ❌";
    setMessage(errorMsg);
  } finally {
    setLoading(false);
  }
};

export default handleLoginSubmit;
