import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [visitType, setVisitType] = useState("Video");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (loggedInUser && loggedInUser.role === "patient") {
      setPatientName(loggedInUser.name || "Patient");
      setPatientEmail(loggedInUser.email || "");
      const userAppointments = allAppointments.filter(
        (appt) =>
          appt.patientEmail === loggedInUser.email ||
          appt.patientName === loggedInUser.name
      );
      setAppointments(userAppointments);
    } else {
      navigate("/login");
    }

    // Mock doctor data (replace with API later)
    setDoctors([
      {
        id: 1,
        name: "Dr. Ramesh Kumar",
        specialization: "Cardiologist",
        hospital: "Apollo Hospital, Hyderabad",
        fee: 800,
        availableTimes: ["10:00 AM", "12:30 PM", "5:00 PM"],
        visitTypes: ["Video", "In-person"],
      },
      {
        id: 2,
        name: "Dr. Neha Sharma",
        specialization: "Dermatologist",
        hospital: "Yashoda Hospital, Secunderabad",
        fee: 600,
        availableTimes: ["9:00 AM", "2:00 PM", "6:30 PM"],
        visitTypes: ["Video", "In-person"],
      },
      {
        id: 3,
        name: "Dr. Ravi Patel",
        specialization: "Orthopedic Surgeon",
        hospital: "KIMS Hospital, Gachibowli",
        fee: 1000,
        availableTimes: ["11:00 AM", "1:30 PM", "4:30 PM"],
        visitTypes: ["In-person"],
      },
    ]);
  }, [navigate]);

  // 🚪 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  // 🧭 Prevent reloading on Home click
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/patient-dashboard") {
      navigate("/patient-dashboard");
    }
  };

  const handleBookClick = (doctor) => {
    setBookingDoctor(doctor);
    setSelectedTime("");
    setVisitType(doctor.visitTypes?.[0] || "Video");
    setShowBookingForm(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) {
      alert("Please select an available time.");
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientName: loggedInUser.name || patientName,
      patientEmail: loggedInUser.email || patientEmail,
      doctorName: bookingDoctor.name,
      specialization: bookingDoctor.specialization,
      hospital: bookingDoctor.hospital,
      date: new Date().toLocaleDateString(),
      time: selectedTime,
      fee: bookingDoctor.fee,
      visitType,
      status: "Pending",
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    existingAppointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));

    setAppointments((prev) => [...prev, newAppointment]);
    setShowBookingForm(false);

    alert(`✅ Appointment request sent to ${bookingDoctor.name}.`);
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
            title={patientName}
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
            {patientName ? patientName.charAt(0).toUpperCase() : "P"}
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
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#004aad", fontSize: "32px", fontWeight: "700" }}>
          👋 Welcome, {patientName}
        </h1>
        <p style={{ color: "#555", fontSize: "17px" }}>
          Book consultations and manage your upcoming appointments.
        </p>
      </div>

      {/* Available Doctors */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto 40px",
        }}
      >
        <h2 style={{ color: "#004aad", fontWeight: "600", marginBottom: "20px" }}>
          Available Doctors
        </h2>

        {doctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "18px",
              marginBottom: "18px",
              backgroundColor: "#f9fbff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ color: "#004aad", margin: 0 }}>{doc.name}</h3>
                <div style={{ color: "#444", marginTop: 6 }}>
                  <small>{doc.specialization} — {doc.hospital}</small>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>₹{doc.fee}</div>
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => handleBookClick(doc)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "8px 14px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, color: "#555" }}>
              <strong>Available times:</strong> {doc.availableTimes.join(", ")} •{" "}
              <strong>Visit:</strong> {doc.visitTypes.join(", ")}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingForm && bookingDoctor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div style={{ width: 420, background: "white", borderRadius: 10, padding: 22 }}>
            <h3 style={{ marginTop: 0, color: "#004aad" }}>
              Book with {bookingDoctor.name}
            </h3>
            <p style={{ marginTop: 6 }}>
              {bookingDoctor.specialization} • {bookingDoctor.hospital}
            </p>

            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", fontWeight: 600 }}>Select time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6, borderRadius: 6 }}
              >
                <option value="">-- Select a slot --</option>
                {bookingDoctor.availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", fontWeight: 600 }}>Visit type</label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6, borderRadius: 6 }}
              >
                {bookingDoctor.visitTypes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
              <button
                onClick={() => setShowBookingForm(false)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #ddd" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "26px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          maxWidth: 980,
          margin: "0 auto 50px",
        }}
      >
        <h2 style={{ color: "#004aad", marginTop: 0 }}>Your Upcoming Appointments</h2>

        {appointments.length === 0 ? (
          <p style={{ color: "#666" }}>No appointments booked yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                <th style={{ padding: 10 }}>Doctor</th>
                <th>When</th>
                <th>Visit</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td style={{ padding: 8 }}>{a.doctorName}</td>
                  <td style={{ padding: 8 }}>{a.date} • {a.time}</td>
                  <td style={{ padding: 8 }}>{a.visitType}</td>
                  <td style={{ padding: 8 }}>₹{a.fee}</td>
                  <td style={{ padding: 8 }}>{a.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;

