import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.name) {
      setDoctorName(loggedInUser.name);
    } else {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  // 📅 Appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Keerthana",
      patientEmail: "keerthana@gmail.com",
      disease: "High Blood Pressure",
      hospital: "Apollo Hospital, Hyderabad",
      date: "04/11/2025",
      time: "9:30 AM",
      visitType: "Video Consultation",
      fee: 800,
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Arjun Reddy",
      patientEmail: "arjun.reddy@example.com",
      disease: "Chest Pain",
      hospital: "Apollo Hospital, Hyderabad",
      date: "05/11/2025",
      time: "12:00 PM",
      visitType: "In-Person Visit",
      fee: 800,
      status: "Cancelled",
    },
    {
      id: 3,
      patientName: "Priya Sharma",
      patientEmail: "priya.sharma@example.com",
      disease: "Heart Palpitations",
      hospital: "Apollo Hospital, Hyderabad",
      date: "06/11/2025",
      time: "10:00 AM",
      visitType: "Video Consultation",
      fee: 800,
      status: "Pending",
    },
  ]);

  // ✅ Confirm Appointment
  const handleConfirm = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Confirmed" } : a))
    );
    alert("✅ Appointment confirmed successfully!");
  };

  // ❌ Cancel Appointment
  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
    alert("❌ Appointment cancelled.");
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 🌐 Top Navigation Bar */}
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
            style={{
              width: "40px",
              height: "40px",
              animation: "floatLogo 2s ease-in-out infinite",
            }}
          />
          <h2 style={{ color: "#004aad", fontWeight: "700" }}>
            ApolloCare Official Portal
          </h2>
        </div>

        {/* 🔗 Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link
            to="/home"
            style={{ color: "#004aad", textDecoration: "none", fontWeight: "500" }}
          >
            Home
          </Link>
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
            title={doctorName}
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
            {doctorName ? doctorName.charAt(0).toUpperCase() : "D"}
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

      {/* 🩺 Dashboard Header */}
      <div
        style={{
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#004aad",
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          👨‍⚕️ Welcome, {doctorName ? doctorName : "Doctor"}
        </h1>
        <p style={{ color: "#555", fontSize: "17px" }}>
          Manage your patient appointments efficiently.
        </p>
      </div>

      {/* 🗓 Appointment Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          padding: "25px",
          maxWidth: "1150px",
          margin: "0 auto 50px",
        }}
      >
        <h2
          style={{
            color: "#004aad",
            fontWeight: "600",
            marginBottom: "20px",
            borderBottom: "2px solid #004aad",
            paddingBottom: "10px",
          }}
        >
          Patient Appointments (Past, Today & Upcoming)
        </h2>

        {appointments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", marginTop: "30px" }}>
            No appointments found.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#004aad", color: "#fff" }}>
                <th style={{ padding: "12px" }}>Patient</th>
                <th>Disease</th>
                <th>Visit Type</th>
                <th>Hospital</th>
                <th>Date & Time</th>
                <th>Fee</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a, index) => (
                <tr
                  key={a.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9faff" : "#ffffff",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td style={{ padding: "10px" }}>
                    <div style={{ fontWeight: "600" }}>{a.patientName}</div>
                    <div style={{ color: "#666", fontSize: "13px" }}>
                      {a.patientEmail}
                    </div>
                  </td>
                  <td style={{ padding: "10px" }}>{a.disease}</td>
                  <td style={{ padding: "10px" }}>{a.visitType}</td>
                  <td style={{ padding: "10px" }}>{a.hospital}</td>
                  <td style={{ padding: "10px" }}>
                    {a.date} <br />
                    <span style={{ color: "#555" }}>{a.time}</span>
                  </td>
                  <td style={{ padding: "10px" }}>₹{a.fee}</td>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "600",
                      color:
                        a.status === "Confirmed"
                          ? "#0b7e33"
                          : a.status === "Cancelled"
                          ? "#d03b3b"
                          : "#007bff",
                    }}
                  >
                    {a.status}
                  </td>

                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {a.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleConfirm(a.id)}
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            marginRight: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleCancel(a.id)}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {a.status === "Confirmed" && (
                      <span style={{ color: "#0b7e33", fontWeight: "600" }}>
                        ✅ Confirmed
                      </span>
                    )}
                    {a.status === "Cancelled" && (
                      <span style={{ color: "#d03b3b", fontWeight: "600" }}>
                        ❌ Cancelled
                      </span>
                    )}
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

export default DoctorDashboard;
