import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data?.token;
      if (!token) {
        setError("No token received from server.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/app");
    } catch (err) {
      console.error(err);
      setError("Login failed. Check your email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFE5B4 0%, #E8B5FF 25%, #9B7EDE 50%, #4A3B6B 75%, #1a1a2e 100%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-150px",
        left: "-150px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }} />

      {/* Logo */}
      <div style={{
        position: "absolute",
        top: "24px",
        left: "24px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }} onClick={() => navigate("/")}>
        <div style={{
          width: "32px",
          height: "32px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: "14px",
        }}>
          C
        </div>
        <span style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.1rem" }}>
          Campus Connect
        </span>
      </div>

      {/* Login Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "48px 40px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Icon */}
        <div style={{
          width: "56px",
          height: "56px",
          background: "#f3f4f6",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "24px",
        }}>
          🔐
        </div>

        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#1a1a2e",
          textAlign: "center",
          marginBottom: "8px",
        }}>
          Sign in to Campus Connect
        </h2>
        
        <p style={{
          fontSize: "0.9rem",
          color: "#6b7280",
          textAlign: "center",
          marginBottom: "32px",
        }}>
          Use your college email to access your campus space
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Email Input */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              fontSize: "16px",
            }}>
              ✉️
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                color: "#1a1a2e",
                padding: "14px 16px 14px 48px",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              fontSize: "16px",
            }}>
              🔒
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                color: "#1a1a2e",
                padding: "14px 48px 14px 48px",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
                fontSize: "16px",
                padding: "0",
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: "right" }}>
            <a
              href="#"
              style={{
                fontSize: "13px",
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <p style={{
              fontSize: "13px",
              color: "#ef4444",
              background: "#fef2f2",
              padding: "10px 14px",
              borderRadius: "8px",
              margin: "0",
            }}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              border: "none",
              borderRadius: "12px",
              background: "#1a1a2e",
              color: "white",
              padding: "14px 24px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 8px 24px rgba(26, 26, 46, 0.3)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            {loading ? "Signing in..." : "Get Started"}
          </button>

          {/* Sign Up Link */}
          <p style={{
            textAlign: "center",
            marginTop: "16px",
            marginBottom: "0",
            fontSize: "14px",
            color: "#6b7280",
          }}>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}