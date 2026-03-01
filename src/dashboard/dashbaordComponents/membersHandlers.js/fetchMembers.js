import axios from "axios";

export const fetchMembers = async (setMembers) => {
  try {
    const response = await axios.get("/api/v1/users/all-users");
    setMembers(response?.data?.data?.users);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};
