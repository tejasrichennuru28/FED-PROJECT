import { useEffect, useState } from "react";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [disease, setDisease] = useState("");
  const [customDisease, setCustomDisease] = useState("");
  const [visitType, setVisitType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [appointments, setAppointments] = useState([]);

  // 🔹 Load logged-in user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setPatientName(user.name);
    }
  }, []);

  // 🔹 Doctor data
  const doctors = [
    { id: 1, name: "Dr. Ramesh Rao", specialization: "Dentist", timing: "Mon - Wed, 10 AM - 4 PM", fee: 400 },
    { id: 2, name: "Dr. Priya Nair", specialization: "Gynecologist", timing: "Mon - Fri, 11 AM - 5 PM", fee: 600 },
    { id: 3, name: "Dr. Arun Verma", specialization: "Cardiologist", timing: "Tue - Thu, 9 AM - 1 PM", fee: 700 },
    { id: 4, name: "Dr. Meenakshi Das", specialization: "Dermatologist", timing: "Mon - Fri, 10 AM - 5 PM", fee: 550 },
  ];

  const diseases = ["Fever", "Cold & Cough", "Tooth Pain", "Skin Allergy", "Heart Pain", "Migraine", "Other"];

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const finalDisease = disease === "Other" ? customDisease : disease;

    if (!patientName || !finalDisease || !visitType || !paymentMethod || !selectedDoctor) {
      alert("⚠️ Please fill all details before booking!");
      return;
    }

    const newAppointment = {
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      patientName,
      disease: finalDisease,
      visitType,
      paymentMethod,
      fee: selectedDoctor.fee,
    };

    setAppointments([...appointments, newAppointment]);
    alert("✅ Appointment booked successfully!");
    setSelectedDoctor(null);
    setDisease("");
    setCustomDisease("");
    setVisitType("");
    setPaymentMethod("");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9fbff", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Header Section */}
      <h1 style={{ textAlign: "center", color: "#004aad", marginBottom: "10px" }}>
        🏥 ApolloCare - {loggedInUser ? `${loggedInUser.role.toUpperCase()} Dashboard` : "Welcome"}
      </h1>

      {loggedInUser && (
        <p style={{ textAlign: "center", color: "#666", fontSize: "18px" }}>
          Hello, <b>{loggedInUser.name}</b> 👋
        </p>
      )}

      {/* Doctor List Section */}
      {!selectedDoctor ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {doctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "#007bff" }}>{doc.name}</h2>
              <p><b>Specialization:</b> {doc.specialization}</p>
              <p><b>Available:</b> {doc.timing}</p>
              <p><b>Fee:</b> ₹{doc.fee}</p>

              <button
                onClick={() => handleBook(doc)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Appointment Form
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "600px",
            margin: "auto",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#004aad", textAlign: "center" }}>
            Booking with {selectedDoctor.name}
          </h2>
          <p style={{ textAlign: "center", color: "#666" }}>
            {selectedDoctor.specialization} | {selectedDoctor.timing}
          </p>
          <p style={{ textAlign: "center", color: "#28a745" }}>
            Consultation Fee: ₹{selectedDoctor.fee}
          </p>

          <form onSubmit={handleConfirm} style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <select
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Disease</option>
              {diseases.map((dis, i) => (
                <option key={i} value={dis}>{dis}</option>
              ))}
            </select>

            {disease === "Other" && (
              <input
                type="text"
                placeholder="Type your disease"
                value={customDisease}
                onChange={(e) => setCustomDisease(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            )}

            <select
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Visit Type</option>
              <option value="Video Call">Video Call</option>
              <option value="Hospital Visit">Hospital Visit</option>
            </select>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash at Clinic">Cash at Clinic</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ❌ Cancel
              </button>

              <button
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointment History */}
      {appointments.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            maxWidth: "800px",
            margin: "50px auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#007bff", textAlign: "center" }}>
            📋 Your Appointments
          </h3>
          <ul>
            {appointments.map((a, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                  fontSize: "16px",
                }}
              >
                <b>{a.patientName}</b> booked <b>{a.doctor}</b> ({a.specialization})
                for <b>{a.disease}</b> via <b>{a.visitType}</b> — Payment:{" "}
                <b>{a.paymentMethod}</b> — ₹{a.fee}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
