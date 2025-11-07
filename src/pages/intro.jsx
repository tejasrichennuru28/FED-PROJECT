import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();
  const [showGetStarted, setShowGetStarted] = useState(false);

  useEffect(() => {
    // Show "Get Started" text after 2 seconds
    const showText = setTimeout(() => {
      setShowGetStarted(true);
    }, 2000);

    // Redirect to signup page after 4 seconds
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 4000);

    return () => {
      clearTimeout(showText);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: "#f9fbff",
        color: "#004aad",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          animation: "slide 2s ease-in-out",
          fontWeight: "bold",
        }}
      >
        🏥 ApolloCare Hospitals
      </h1>

      {showGetStarted && (
        <p
          style={{
            fontSize: "22px",
            marginTop: "20px",
            color: "#007bff",
            fontWeight: "600",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          Get Started →
        </p>
      )}

      <style>
        {`
          @keyframes slide {
            0% { transform: translateY(100px); opacity: 0; }
            50% { transform: translateY(-10px); opacity: 0.7; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Intro;
