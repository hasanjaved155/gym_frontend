import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import UserLogin from "./components/auth/UserLogin";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useAuth } from "./contextApi/AuthContext";
import UserRegister from "./components/auth/UserRegister";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserProfile from "./profile/UserProfile";
import EditProfile from "./profile/EditProfile";
import Feedback from "./feedback/Feedback";

axios.defaults.baseURL = "https://pandey-gym.vercel.app";
axios.defaults.withCredentials = true;

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/register" || location.pathname === "/login")
    ) {
      alert("You are already registered");
      navigate("/");
    } else if (!user && location.pathname === "/feedback") {
      alert("Please login to give feedback");
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handlePopState = () => {
      // If we're not on home page, go to home
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      // If we're on home page, let browser handle it (will close app on mobile)
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [location.pathname, navigate]);

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        {/* main pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* authentication */}
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {/* Profile Data */}
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* feedback */}
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
