import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);   // 🔥 start loading
    const res = await axios.post("resume-analyzer-backend-production-044b.up.railway.app/api/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
    setResult(res.data);
  } catch (err) {
    console.error(err);
    setResult("Error connecting backend ❌");
  } finally {
    setLoading(false);  // 🔥 stop loading
  }
};

  // ✅ CLEAN SPLIT
  const lines = result.split("\n").filter(line => line.trim() !== "");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ffe4ec, #eef2ff)",
      fontFamily: "Poppins, sans-serif"
    }}>

      <div style={{
        background: "#ffffff",
        padding: "40px",
        borderRadius: "20px",
        width: "420px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>

        {/* TITLE */}
        <h1 style={{
          fontSize: "26px",
          fontWeight: "600",
          margin: 0,
          color: "#1f2937"
        }}>
          Resume Analyzer
        </h1>

        <p style={{
          color: "#6b7280",
          fontSize: "13px",
          marginTop: "6px"
        }}>
          Upload your resume and get insights
        </p>

        {/* INPUT + BUTTON (FIXED ALIGNMENT) */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px"
        }}>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              fontSize: "13px"
            }}
          />

          <button
            onClick={handleUpload}
            style={{
              background: "#6366f1",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px"
            }}
          >
            Analyze
          </button>

        </div>

        {loading && (
  <div style={{
    marginTop: "20px",
    textAlign: "center",
    color: "#6366f1",
    fontWeight: "500"
  }}>
    ⏳ Analyzing resume...
  </div>
)}

        {/* RESULT */}
        {!loading && lines.length > 0 && (
          <div style={{ marginTop: "30px", textAlign: "left" }}>

            {/* SCORE */}
            <div style={{
              background: "#fef3c7",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "600",
              color: "#92400e",
              fontSize: "14px"
            }}>
              ⭐ {lines[0]}
            </div>

            {/* ROLE */}
            {lines[1] && (
              <div style={{
                marginTop: "10px",
                background: "#e0e7ff",
                padding: "10px",
                borderRadius: "10px",
                fontWeight: "500",
                color: "#3730a3",
                fontSize: "13px"
              }}>
                💼 {lines[1]}
              </div>
            )}

            {!loading && lines.length === 0 && result && (
  <div style={{
    marginTop: "20px",
    color: "#ef4444",
    fontWeight: "500"
  }}>
    ⚠ No skills detected in this resume
  </div>
)}

            {/* REPORT (FIXED SPACING) */}
          <div style={{
  marginTop: "12px",
  background: "#f9fafb",
  padding: "18px",
  borderRadius: "12px",
  fontSize: "14px",
  color: "#374151"
}}>
  {lines.slice(2).map((line, index) => (
    <div key={index} style={{ marginBottom: "6px" }}>
      {line.startsWith("✔") ? (
        <span style={{
          display: "inline-block",
          background: "#eef2ff",
          color: "#4338ca",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          marginRight: "6px"
        }}>
          {line.replace("✔ ", "")}
        </span>
      ) : (
        <div style={{
          fontWeight: "600",
          marginTop: "10px",
          marginBottom: "4px"
        }}>
          {line}
        </div>
      )}
    </div>
  ))}
</div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
