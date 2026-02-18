import axios from "axios";

const handleResetPasswordSubmit = async (
  e,
  password,
  confirmPassword,
  id,
  token,
  navigate,
  setMessage,
  setLoading,
) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  setLoading(true);
  try {
    const res = await axios?.post(
      `/api/v1/users/reset-password/${id}/${token}`,
      {
        password,
      },
    );
    alert(res?.data?.message || "Password reset successful");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    setMessage(
      error.response?.data?.message || "Error resetting password. Try again.",
    );
  } finally {
    setLoading(false);
  }
};
export default handleResetPasswordSubmit;
