import axios from "axios";

const handleRegisterSubmit = async (
  e,
  navigate,
  setMessage,
  setFormData,
  setLoading,
  formData,
  setPreview,
) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const response = await axios?.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Registration Success:", response?.data?.data);
    setMessage("Registration successful! ✅");
    setFormData({
      username: "",
      email: "",
      password: "",
      phonenumber: "",
      avatar: null,
    });
    setPreview(null);
    // Store user data if needed
    if (response?.data?.data) {
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      navigate("/login");
    }
  } catch (error) {
    console.log(
      "❌ Registration Error:",
      error.response?.data || error.message,
    );
    const errorMsg = error.response?.data?.message || "Registration failed! ❌";
    setMessage(errorMsg);
  } finally {
    setLoading(false);
  }
};
export default handleRegisterSubmit;
