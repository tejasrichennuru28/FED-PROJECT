import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import "./App.css";

// 🌟 Welcome / Intro Page
function GetStarted() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #e3f2fd, #bbdefb)",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          color: "#004aad",
          fontWeight: "bold",
          marginBottom: "30px",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        Welcome to ApolloCare Portal 🏥
      </h1>

      <p style={{ fontSize: "18px", color: "#333", marginBottom: "40px" }}>
        Your trusted healthcare platform for doctor consultations and hospital
        management.
      </p>

      <button
        onClick={() => navigate("/signup")}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "14px 30px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Get Started →
      </button>
    </div>
  );
}

// 🌐 Main Application Component
function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  // ✅ Load user info from localStorage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserRole(loggedInUser.role);
      setUserName(loggedInUser.name || "");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUserRole("");
    setUserName("");
    alert("👋 You have logged out successfully!");
    navigate("/login"); // ✅ Redirect to Login page
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 50px",
          backgroundColor: "#f5f9ff",
          color: "#004aad",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        {/* 🏥 Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Apollo Logo"
            style={{
              width: "40px",
              height: "40px",
              animation: "floatLogo 2s ease-in-out infinite",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#004aad",
            }}
          >
            ApolloCare Official Portal
          </div>
        </div>

        {/* 🔗 Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link
            to="/home"
            style={{
              color: "#004aad",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            style={{
              color: "#004aad",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: "#004aad",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Contact
          </Link>
          <Link
            to="/profile"
            style={{
              color: "#004aad",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Profile
          </Link>
        </nav>

        {/* 🔘 Right Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {isLoggedIn ? (
            <>
              <span style={{ color: "#004aad", fontWeight: "600" }}>
                👋 Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </header>

      {/* 🧭 Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/get-started" />} />
        <Route path="/get-started" element={<GetStarted />} />

        {/* 🏠 Home auto redirect by role */}
        <Route
          path="/home"
          element={
            userRole === "doctor" ? (
              <DoctorDashboard />
            ) : userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Home />
            )
          }
        />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

// ✅ Wrap with Router (so navigate works properly)
export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

