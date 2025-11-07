import React, { useEffect, useState } from "react";

function Profile() {
  // 💾 Local storage ni check chesi login user ni fetch chestham
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "22px",
          color: "#777",
        }}
      >
        ⚠️ Please login to view your profile.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#eef6fb",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#007bff",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        👤 My Profile
      </h1>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <img
          src={
            user.role === "doctor"
              ? "https://cdn-icons-png.flaticon.com/512/3774/3774298.png"
              : "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          }
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            display: "block",
            margin: "0 auto 20px auto",
          }}
        />
        <h2 style={{ textAlign: "center", color: "#007bff" }}>
          {user.name || "User Name"}
        </h2>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
          Role: <b>{user.role === "doctor" ? "Doctor" : "Patient"}</b>
        </p>

        <div style={{ textAlign: "left", lineHeight: "2", fontSize: "17px" }}>
          <p>
            <b>📧 Email:</b> {user.email || "Not provided"}
          </p>
          {user.role === "doctor" && (
            <>
              <p>
                <b>🩺 Specialist:</b> {user.specialist || "General Medicine"}
              </p>
              <p>
                <b>🏥 Experience:</b> {user.experience || "5+ Years"}
              </p>
            </>
          )}
          {user.role === "patient" && (
            <>
              <p>
                <b>🎟️ Appointments Booked:</b> {user.appointments?.length || 0}
              </p>
              <p>
                <b>📅 Last Appointment:</b>{" "}
                {user.lastAppointment || "Not yet booked"}
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "/login";
          }}
          style={{
            marginTop: "30px",
            backgroundColor: "#dc3545",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
