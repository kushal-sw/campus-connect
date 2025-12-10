import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Confessions from "./pages/Confessions";
import Tea from "./pages/Tea";
import Bulletin from "./pages/Bulletin";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/* -------- NAVBAR -------- */

function NavbarWrapper() {
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem("token");
  const path = window.location.pathname;

  // hide navbar on login, signup, landing, and home page
  if (!loggedIn && (path === "/login" || path === "/" || path === "/signup")) return null;
  if (path === "/app" || path === "/") return null;

  return (
    <nav className="navbar">
      <div className="navbar-title">CampusConnect</div>

      <div className="navbar-links">
        <button className="nav-link" onClick={() => navigate("/app")}>
          Home
        </button>
        <button className="nav-link" onClick={() => navigate("/confessions")}>
          Confessions
        </button>
        <button className="nav-link" onClick={() => navigate("/tea")}>
          Tea
        </button>
        <button className="nav-link" onClick={() => navigate("/bulletin")}>
          Bulletin
        </button>
        <button className="nav-link" onClick={() => navigate("/search")}>
          Search
        </button>
        <button className="nav-link" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </nav>
  );
}

/* -------- HOME PAGE -------- */

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFE5B4 0%, #E8B5FF 25%, #9B7EDE 50%, #4A3B6B 75%, #1a1a2e 100%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "-150px",
        right: "-150px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-200px",
        left: "-100px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 5%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: "16px",
          }}>
            C
          </div>
          <span style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "1.1rem" }}>
            Campus Connect
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <button onClick={() => navigate("/search")} style={{ background: "none", border: "none", color: "#2a2a3e", fontWeight: 500, fontSize: "14px", cursor: "pointer" }}>Search</button>
          <button onClick={() => navigate("/profile")} style={{ background: "none", border: "none", color: "#2a2a3e", fontWeight: 500, fontSize: "14px", cursor: "pointer" }}>Profile</button>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50px",
              color: "#1a1a2e",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign Out
          </button>
        </nav>
      </header>

      {/* Hero Section - Compact */}
      <section style={{
        padding: "40px 5% 30px",
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "8px 16px",
          borderRadius: "50px",
          marginBottom: "16px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}>
          <span>👀</span>
          <span style={{ color: "#1a1a2e", fontWeight: 600, fontSize: "13px" }}>
            your campus, unfiltered
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          fontWeight: 900,
          color: "#1a1a2e",
          lineHeight: 1.1,
          letterSpacing: "-2px",
          margin: "0 0 8px 0",
        }}>
          What's the
        </h1>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          margin: "0 0 16px 0",
        }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            margin: 0,
          }}>
            tea today?
          </h1>
          <span style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>☕</span>
        </div>

        <p style={{
          fontSize: "1rem",
          color: "#3a3a4e",
          maxWidth: "450px",
          margin: "0 auto",
          lineHeight: 1.5,
        }}>
          Spill secrets. Drop tea. Stay in the loop. All anonymous.
        </p>
      </section>

      {/* 3 Feature Cards - Dark Style */}
      <section style={{
        padding: "20px 5% 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <style>
          {`
            .feature-card {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .feature-card:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4) !important;
            }
            .feature-card:hover .card-arrow {
              transform: translateX(4px);
            }
            .card-arrow {
              transition: transform 0.3s ease;
            }
            .card-button {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .card-button:hover {
              transform: scale(1.05);
              box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5) !important;
            }
            .card-button:active {
              transform: scale(0.98);
            }
          `}
        </style>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {/* Confessions Card */}
          <div
            className="feature-card"
            onClick={() => navigate("/confessions")}
            style={{
              background: "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "32px",
              cursor: "pointer",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "280px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎭</div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: "10px",
            }}>
              Confessions
            </h3>
            <p style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "24px",
              lineHeight: 1.5,
              maxWidth: "220px",
            }}>
              Say what you really think. No names, no judgment.
            </p>
            <button
              className="card-button"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                border: "none",
                borderRadius: "50px",
                color: "#1a1a2e",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 30px rgba(168, 237, 234, 0.3)",
              }}
            >
              Start Confessing
              <span>→</span>
            </button>
          </div>

          {/* Tea Card */}
          <div
            className="feature-card"
            onClick={() => navigate("/tea")}
            style={{
              background: "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "32px",
              cursor: "pointer",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "280px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>☕</div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: "10px",
            }}>
              Tea / Gossip
            </h3>
            <p style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "24px",
              lineHeight: 1.5,
              maxWidth: "220px",
            }}>
              Hottest campus gossip, served fresh daily.
            </p>
            <button
              className="card-button"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #E8B5FF 0%, #9B7EDE 100%)",
                border: "none",
                borderRadius: "50px",
                color: "white",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 30px rgba(155, 126, 222, 0.4)",
              }}
            >
              Get the Tea
              <span>→</span>
            </button>
          </div>

          {/* Bulletin Card */}
          <div
            className="feature-card"
            onClick={() => navigate("/bulletin")}
            style={{
              background: "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "32px",
              cursor: "pointer",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "280px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>�</div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "white",
              marginBottom: "10px",
            }}>
              Bulletin
            </h3>
            <p style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "24px",
              lineHeight: 1.5,
              maxWidth: "220px",
            }}>
              Events & announcements. Never miss out.
            </p>
            <button
              className="card-button"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #FFE5B4 0%, #f59e0b 100%)",
                border: "none",
                borderRadius: "50px",
                color: "#1a1a2e",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 30px rgba(245, 158, 11, 0.3)",
              }}
            >
              Check Updates
              <span>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------- ROOT APP -------- */

export default function App() {
  return (

    <Router>
      <NavbarWrapper />
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<Landing />} />
        {/* Public signup */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard home */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* other protected routes */}
        <Route
          path="/confessions"
          element={
            <ProtectedRoute>
              <Confessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tea"
          element={
            <ProtectedRoute>
              <Tea />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulletin"
          element={
            <ProtectedRoute>
              <Bulletin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}