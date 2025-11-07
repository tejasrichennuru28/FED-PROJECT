import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState("");
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // ✅ Load admin + data
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.role === "admin") {
      setAdminName(loggedInUser.name || "Admin");
    } else {
      navigate("/login");
    }

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setUsers(allUsers);
    setAppointments(allAppointments);
  }, [navigate]);

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  // 🧭 Prevent reload on Home click
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/admin-dashboard") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 🌐 Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: "#f5f9ff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* 🏥 Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Apollo Logo"
            style={{ width: "40px", height: "40px" }}
          />
          <h2 style={{ color: "#004aad", fontWeight: "700" }}>
            ApolloCare Official Portal
          </h2>
        </div>

        {/* 🔗 Navbar Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <a
            href="#home"
            onClick={handleHomeClick}
            style={{ color: "#004aad", textDecoration: "none", fontWeight: "500" }}
          >
            Home
          </a>
          <Link
            to="/about"
            style={{ color: "#004aad", textDecoration: "none", fontWeight: "500" }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{ color: "#004aad", textDecoration: "none", fontWeight: "500" }}
          >
            Contact
          </Link>
          <Link
            to="/profile"
            style={{ color: "#004aad", textDecoration: "none", fontWeight: "500" }}
          >
            Profile
          </Link>
        </nav>

        {/* 👤 Profile + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div
            title={adminName}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#004aad",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {adminName ? adminName.charAt(0).toUpperCase() : "A"}
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🧑‍💼 Dashboard Header */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#004aad", fontSize: "32px", fontWeight: "700" }}>
          🧑‍💼 Welcome, {adminName}
        </h1>
        <p style={{ color: "#555", fontSize: "17px" }}>
          Manage users, appointments, and hospital activities efficiently.
        </p>
      </div>

      {/* 👥 Registered Users Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "0 auto 40px",
          maxWidth: "1100px",
        }}
      >
        <h2 style={{ color: "#007bff" }}>👥 Registered Users</h2>
        {users.length === 0 ? (
          <p style={{ color: "#666" }}>No users found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <td style={{ padding: "10px" }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td style={{ textTransform: "capitalize" }}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📅 Appointments Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "0 auto 50px",
          maxWidth: "1100px",
        }}
      >
        <h2 style={{ color: "#28a745" }}>📅 All Appointments</h2>
        {appointments.length === 0 ? (
          <p style={{ color: "#666" }}>No appointments booked yet.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#28a745", color: "white" }}>
                <th style={{ padding: "10px" }}>Patient</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Hospital</th>
                <th>Visit Type</th>
                <th>Payment</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <td style={{ padding: "10px" }}>{a.patientName}</td>
                  <td>{a.doctorName || a.doctor}</td>
                  <td>{a.specialization || "-"}</td>
                  <td>{a.hospital || "-"}</td>
                  <td>{a.visitType}</td>
                  <td>{a.paymentMethod || "Pending"}</td>
                  <td>₹{a.fee}</td>
                  <td
                    style={{
                      color:
                        a.status === "Confirmed"
                          ? "#0b7e33"
                          : a.status === "Cancelled"
                          ? "#d03b3b"
                          : "#007bff",
                      fontWeight: "600",
                    }}
                  >
                    {a.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
