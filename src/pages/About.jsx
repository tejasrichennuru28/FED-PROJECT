import React from "react";

function About() {
  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        color: "#333",
        lineHeight: "1.7",
      }}
    >
      <h1
        style={{
          color: "#007bff",
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "42px",
        }}
      >
        About ApolloCare Hospitals 🏥
      </h1>

      <p
        style={{
          fontSize: "18px",
          textAlign: "center",
          maxWidth: "850px",
          margin: "auto",
          color: "#555",
        }}
      >
        ApolloCare Hospitals is a trusted name in healthcare, delivering excellence for
        over three decades. We are committed to providing compassionate, high-quality
        medical services to every patient — combining advanced technology with expert care.
      </p>

      {/* 🩺 About Details Section */}
      <div
        style={{
          marginTop: "50px",
          maxWidth: "850px",
          margin: "50px auto",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#007bff",
            borderBottom: "2px solid #007bff",
            paddingBottom: "8px",
          }}
        >
          🩷 Who We Are
        </h2>
        <p>
          Founded in 1983, ApolloCare has grown into one of India’s most trusted
          healthcare groups. Our hospitals offer world-class facilities with state-of-the-art
          medical equipment, highly qualified doctors, and specialized departments.
        </p>

        <h2
          style={{
            color: "#007bff",
            borderBottom: "2px solid #007bff",
            paddingBottom: "8px",
            marginTop: "30px",
          }}
        >
          🎯 Our Mission
        </h2>
        <p>
          To make quality healthcare accessible, affordable, and advanced.  
          We aim to promote wellness, prevention, and innovation in every field of medicine,
          ensuring that every patient receives personalized care and attention.
        </p>

        <h2
          style={{
            color: "#007bff",
            borderBottom: "2px solid #007bff",
            paddingBottom: "8px",
            marginTop: "30px",
          }}
        >
          🏥 Our Core Services
        </h2>
        <ul style={{ textAlign: "left", marginLeft: "20px", fontSize: "17px" }}>
          <li>✅ Multi-Specialty Consultations (Cardiology, Gynecology, Orthopedics, etc.)</li>
          <li>✅ 24x7 Emergency & Critical Care Unit</li>
          <li>✅ Diagnostic & Laboratory Services</li>
          <li>✅ Advanced Surgical Procedures & Robotic Surgeries</li>
          <li>✅ Pharmacy, Wellness, and Rehabilitation Services</li>
        </ul>

        <h2
          style={{
            color: "#007bff",
            borderBottom: "2px solid #007bff",
            paddingBottom: "8px",
            marginTop: "30px",
          }}
        >
          📞 Official Contact Information
        </h2>
        <p>
          <b>📍 Address:</b> ApolloCare Hospitals, Road No. 12, Banjara Hills, Hyderabad, India
        </p>
        <p>
          <b>📞 Phone:</b> +91 98765 43210
        </p>
        <p>
          <b>📧 Email:</b> info@apollocare.in
        </p>

        <h3 style={{ marginTop: "30px", color: "#007bff" }}>🕓 Working Hours</h3>
        <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
        <p>Sunday: Emergency Services Only</p>

        <h3 style={{ marginTop: "30px", color: "#dc3545" }}>🚨 Emergency Helpline</h3>
        <p>
          <b>24x7 Helpline:</b> 108 | +91 99999 11111
        </p>
      </div>

      {/* 🌐 Website Footer */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontSize: "18px",
          color: "#555",
        }}
      >
        <p>
          🌐 Visit our official website:{" "}
          <a
            href="https://www.apollohospitals.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            www.apollohospitals.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
