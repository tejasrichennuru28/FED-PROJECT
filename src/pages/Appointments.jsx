import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Booked Appointments 📅</h2>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appt, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <strong>Doctor:</strong> {appt.doctor} <br />
              <strong>Date:</strong> {appt.date} <br />
              <strong>Time:</strong> {appt.time}
            </li>
          ))}
        </ul>
      )}

      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  );
}

export default Appointments;
