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
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import "./App.css";

// 🌟 Welcome Page Component
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
          fontSize: "48px",
          color: "#004aad",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Welcome to ApolloCare Portal 🏥
      </h1>
      <p style={{ fontSize: "18px", color: "#333", marginBottom: "30px" }}>
        Your trusted platform for doctor consultations and hospital management.
      </p>
      <button
        onClick={() => navigate("/signup")}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "14px 28px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Get Started →
      </button>
    </div>
  );
}

// 🌐 Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  // 🔁 Check login state
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserRole(loggedInUser.role);
      setUserName(loggedInUser.name);
    }
  }, []);

  const navigate = useNavigate();

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUserRole("");
    setUserName("");
    alert("👋 You have logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      {/* 🌐 Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 50px",
          backgroundColor: "#f5f9ff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          position: "sticky",
          top: "0",
          zIndex: "1000",
        }}
      >
        {/* 🏥 Logo & Title */}
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
            ApolloCare Portal
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

        {/* 🔘 Right-side Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {isLoggedIn ? (
            <>
              {/* 🧑 Logged-in user icon */}
              <div
                title={userName}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#004aad",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {userName?.charAt(0) || "U"}
              </div>

              {/* 🚪 Logout */}
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
        {/* Welcome page */}
        <Route path="/" element={<Navigate to="/get-started" />} />
        <Route path="/get-started" element={<GetStarted />} />

        {/* Auto route based on role */}
        <Route
          path="/home"
          element={
            userRole === "doctor" ? (
              <DoctorDashboard />
            ) : userRole === "patient" ? (
              <PatientDashboard />
            ) : userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Static pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
