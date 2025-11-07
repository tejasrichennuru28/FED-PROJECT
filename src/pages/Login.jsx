import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      alert("⚠️ Please select your role before logging in!");
      return;
    }

    let userData = { email, password, role };

    // 🩺 Assign proper doctor names automatically based on email
    if (role === "doctor") {
      if (email === "rameshkumar@apollo.in") {
        userData.name = "Dr. Ramesh Kumar";
      } else if (email === "neha@apollo.in") {
        userData.name = "Dr. Neha Sharma";
      } else if (email === "ravipatel@kims.in") {
        userData.name = "Dr. Ravi Patel";
      } else {
        userData.name = "Doctor";
      }
    } 
    else if (role === "patient") {
      // 🧑 For patients, just use their first part of email as name
      userData.name = email.split("@")[0];
    } 
    else if (role === "admin") {
      userData.name = "Admin";
    }

    // ✅ Save to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    // ✅ Navigate to the right dashboard
    if (role === "patient") {
      alert("✅ Logged in successfully as Patient!");
      navigate("/patient-dashboard");
    } else if (role === "doctor") {
      alert(`✅ Welcome ${userData.name}!`);
      navigate("/doctor-dashboard");
    } else if (role === "admin") {
      alert("✅ Logged in successfully as Admin!");
      navigate("/admin-dashboard");
    } else {
      alert("❌ Invalid login. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#004aad", marginBottom: "20px" }}>🔐 Login to ApolloCare</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Role</option>
            <option value="patient">🧑 Patient</option>
            <option value="doctor">👨‍⚕️ Doctor</option>
            <option value="admin">🛡️ Admin</option>
          </select>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              width: "100%",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px", color: "#555" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#007bff", cursor: "pointer", fontWeight: "600" }}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
