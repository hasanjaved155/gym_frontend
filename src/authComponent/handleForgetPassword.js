import axios from "axios";

const handleForgetPasswordSubmit = async (e, email, setEmail, navigate) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/v1/users/forgot-password", { email });
    console.log("Reset link sent to:", email);
    if (res.status === 200) {
      alert("Reset link sent to your email. Please check your inbox.");
      navigate("/login");
    }
    setEmail("");
  } catch (err) {
    console.error("Error sending reset link:", err);
  }
};

export default handleForgetPasswordSubmit;
