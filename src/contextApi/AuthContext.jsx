import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // important
  const [avatar, setAvatar] = useState(null);

  const login = (data) => {
    // console.log(data);

    setUser(data?.user);
    setAvatar(data?.user?.avatar);
    setAccessToken(data?.accessToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setAvatar(null);
    setAccessToken(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios?.get("/api/v1/users/auth-status", {
          withCredentials: true, // Important for sending cookies
        });

        const data = response?.data?.data;
        if (data) {
          login(data);
        } else {
          logout();
          // Clear localStorage
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        logout();
        // Clear localStorage
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-gray-900">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="animate-pulse text-lg font-semibold text-blue-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoggedIn,
        login,
        logout,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
