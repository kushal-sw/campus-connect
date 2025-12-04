import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
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

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const features = [
    {
      title: "Anonymous Confessions",
      desc: "Share your deepest secrets without revealing your identity.",
      path: "/confessions",
    },
    {
      title: "Tea / Gossip Feed",
      desc: "Get the latest scoop and see what's buzzing on campus.",
      path: "/tea",
    },
    {
      title: "Campus Bulletin",
      desc: "Official announcements, events, and important notices.",
      path: "/bulletin",
    },
    {
      title: "Student Search",
      desc: "Find and connect with other students on campus.",
      path: "/search",
    },
    {
      title: "My Profile",
      desc: "Manage your account settings and view your activity.",
      path: "/profile",
    },
  ];

  return (
    <div className="page-container">
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 className="page-title">Welcome to Campus Connect</h1>
        <p className="page-subtitle">
          Your central hub for everything happening on campus. Stay anonymous, stay informed.
        </p>
      </div>

      <div className="dashboard-grid">
        {features.map((feature) => (
          <div
            key={feature.path}
            className="dashboard-card"
            onClick={() => navigate(feature.path)}
          >
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <button
          onClick={handleLogout}
          className="btn-primary"
          style={{ background: "rgba(255,255,255,0.1)", boxShadow: "none" }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function NavbarWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = !!localStorage.getItem("token");

  if (!loggedIn && location.pathname === "/login") return null;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Confessions", path: "/confessions" },
    { label: "Tea", path: "/tea" },
    { label: "Bulletin", path: "/bulletin" },
    { label: "Search", path: "/search" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-title">CampusConnect</div>
      <div className="navbar-links">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

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