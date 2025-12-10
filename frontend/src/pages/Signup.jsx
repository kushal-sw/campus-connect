// Signup Page - Redesigned with FOMO
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";

export default function Signup() {
  const [stage, setStage] = useState("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
    bio: "",
    relationship_status: "",
  });

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    setError("");

    // All fields are mandatory
    if (!form.name.trim()) {
      setError("What should we call you? Name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("We need your college email to verify you.");
      return;
    }
    if (!form.email.endsWith("@isu.ac.in")) {
      setError("Only @isu.ac.in emails allowed. Nice try though 😏");
      return;
    }
    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters. Keep it secure!");
      return;
    }
    if (!form.branch.trim()) {
      setError("Which branch are you from? Don't be shy!");
      return;
    }
    if (!form.year.trim() || isNaN(form.year) || form.year < 1 || form.year > 4) {
      setError("Year must be between 1-4. We need to know your seniority level 😎");
      return;
    }
    if (!form.bio.trim()) {
      setError("Write something about yourself! Even 'I exist' works.");
      return;
    }
    if (!form.relationship_status.trim()) {
      setError("Relationship status is required. Single? Taken? It's complicated? 👀");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        ...form,
        year: Number(form.year),
      });
      setStage("otp");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp.trim()) {
      setError("Enter the 6-digit OTP from your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp: otp.trim(),
      });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FFE5B4 0%, #E8B5FF 25%, #9B7EDE 50%, #4A3B6B 75%, #1a1a2e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "28px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "440px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
  };

  const inputWrapperStyle = {
    position: "relative",
    marginBottom: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px 14px 44px",
    background: "rgba(0, 0, 0, 0.03)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "14px",
    color: "#1a1a2e",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const inputIconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    opacity: 0.5,
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    background: "#1a1a2e",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 30px rgba(26, 26, 46, 0.3)",
    marginTop: "8px",
  };

  const linkStyle = {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  };

  if (stage === "otp") {
    return (
      <div style={pageStyle}>
        {/* Top left logo button */}
        <div 
          onClick={() => navigate("/")} 
          style={{ 
            position: "absolute", 
            top: "24px", 
            left: "24px", 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            cursor: "pointer",
          }}
        >
          <div style={{
            width: "44px",
            height: "44px",
            background: "#667eea",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: 700,
            color: "white",
          }}>
            C
          </div>
          <span style={{ color: "#1a1a2e", fontWeight: 700, fontSize: "1.1rem" }}>Campus Connect</span>
        </div>

        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-150px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.08)", pointerEvents: "none" }} />

        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>📧</div>
            <h1 style={{ color: "#1a1a2e", fontSize: "1.75rem", fontWeight: 800, marginBottom: "12px" }}>
              Check your inbox
            </h1>
            <p style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              We sent a 6-digit code to<br />
              <span style={{ color: "#667eea", fontWeight: 600 }}>{form.email}</span>
            </p>
          </div>

          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              style={{ 
                width: "100%",
                padding: "18px 20px",
                background: "rgba(0, 0, 0, 0.03)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "14px",
                color: "#1a1a2e",
                fontSize: "1.25rem",
                fontWeight: 600,
                outline: "none",
                textAlign: "center",
                letterSpacing: "6px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", color: "#dc2626", fontSize: "0.9rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button onClick={handleVerifyOtp} disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Verifying..." : "Verify & Continue →"}
          </button>

          <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.5)", fontSize: "0.85rem", marginTop: "20px" }}>
            Didn't receive it? Check spam or <span style={linkStyle} onClick={() => setStage("form")}>go back</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Top left logo button */}
      <div 
        onClick={() => navigate("/")} 
        style={{ 
          position: "absolute", 
          top: "24px", 
          left: "24px", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          cursor: "pointer",
        }}
      >
        <div style={{
          width: "44px",
          height: "44px",
          background: "#667eea",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 700,
          color: "white",
        }}>
          C
        </div>
        <span style={{ color: "#1a1a2e", fontWeight: 700, fontSize: "1.1rem" }}>Campus Connect</span>
      </div>

      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.1)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-150px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.08)", pointerEvents: "none" }} />

      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>
            🎓
          </div>
          <h1 style={{ color: "#1a1a2e", fontSize: "1.6rem", fontWeight: 800, marginBottom: "6px" }}>
            Join Campus Connect
          </h1>
          <p style={{ color: "rgba(0, 0, 0, 0.5)", fontSize: "0.9rem" }}>
            Only <span style={{ color: "#667eea" }}>@isu.ac.in</span> emails allowed
          </p>
        </div>

        {/* FOMO Banner - No false claims */}
        <div style={{ 
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)", 
          border: "1px solid rgba(102, 126, 234, 0.2)", 
          borderRadius: "14px", 
          padding: "14px 16px", 
          marginBottom: "20px",
          textAlign: "center"
        }}>
          <p style={{ color: "#667eea", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>
            🔥 Dive into campus chaos
          </p>
          <p style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "0.8rem", lineHeight: 1.4 }}>
            Anonymous confessions. Unfiltered tea. Pure insanity. <br/>
            <span style={{ color: "#764ba2", fontWeight: 600 }}>An exclusive world only ISU students can access.</span>
          </p>
        </div>

        <div style={inputWrapperStyle}>
          <span style={inputIconStyle}>👤</span>
          <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={inputWrapperStyle}>
          <span style={inputIconStyle}>📧</span>
          <input type="email" name="email" placeholder="College email (@isu.ac.in)" value={form.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={inputWrapperStyle}>
          <span style={inputIconStyle}>🔒</span>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} style={{ ...inputStyle, paddingRight: "44px" }} />
          <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "18px", opacity: 0.6 }}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ ...inputWrapperStyle, marginBottom: 0 }}>
            <span style={inputIconStyle}>📚</span>
            <input type="text" name="branch" placeholder="Your branch" value={form.branch} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ ...inputWrapperStyle, marginBottom: 0 }}>
            <span style={inputIconStyle}>📅</span>
            <input type="text" name="year" placeholder="Year (1-4)" value={form.year} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={inputWrapperStyle}>
          <span style={inputIconStyle}>✏️</span>
          <input type="text" name="bio" placeholder="Tell us about yourself" value={form.bio} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={inputWrapperStyle}>
          <span style={inputIconStyle}>💕</span>
          <input type="text" name="relationship_status" placeholder="Relationship status 👀" value={form.relationship_status} onChange={handleChange} style={inputStyle} />
        </div>

        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", color: "#dc2626", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <button onClick={handleSignup} disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Creating account..." : "Enter the Chaos →"}
        </button>

        <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.4)", fontSize: "0.75rem", marginTop: "16px", lineHeight: 1.4 }}>
          🔒 Exclusive to ISU students only
        </p>

        <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.5)", fontSize: "0.9rem", marginTop: "12px" }}>
          Already have an account? <span style={linkStyle} onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
}
