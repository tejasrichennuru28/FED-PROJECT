import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("⚠️ Please fill all fields before submitting!");
      return;
    }

    const newUser = { name, email, password, role };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Please login now.");
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        minHeight: "100vh",
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
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "420px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#004aad", marginBottom: "25px" }}>🩺 Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              margin: "8px 0",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px",
              width: "100%",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Signup
          </button>
        </form>

        {/* ✅ New Section for Already Have Account */}
        <p
          style={{
            marginTop: "15px",
            color: "#555",
            fontSize: "15px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007bff",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
