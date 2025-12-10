import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const features = [
    {
      icon: "🎭",
      title: "Anonymous Confessions",
      desc: "Share your deepest secrets without revealing your identity. Your voice, completely anonymous.",
      color: "#ec4899",
      route: "/confessions",
    },
    {
      icon: "☕",
      title: "Tea / Gossip Feed",
      desc: "Get the latest scoop and see what's buzzing on campus. Spill or sip the tea.",
      color: "#f59e0b",
      route: "/tea",
    },
    {
      icon: "📰",
      title: "Campus Bulletin",
      desc: "Announcements, events, and official updates. Never miss what's happening.",
      color: "#10b981",
      route: "/bulletin",
    },
    {
      icon: "🔍",
      title: "Student Search",
      desc: "Find and connect with other students. Expand your campus network.",
      color: "#3b82f6",
      route: "/search",
    },
    {
      icon: "👤",
      title: "My Profile",
      desc: "Manage your account settings and details. Make it yours.",
      color: "#8b5cf6",
      route: "/profile",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFE5B4 0%, #E8B5FF 25%, #9B7EDE 50%, #4A3B6B 75%, #1a1a2e 100%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-300px",
        left: "-200px",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "40%",
        right: "10%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "rgba(102, 126, 234, 0.1)",
        filter: "blur(80px)",
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
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
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
          <span style={{
            fontWeight: 700,
            color: "#1a1a2e",
            fontSize: "1.2rem",
          }}>
            Campus Connect
          </span>
        </div>

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
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "white";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.9)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 5% 80px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Welcome Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "60px",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            padding: "8px 16px",
            borderRadius: "50px",
            marginBottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}>
            <span>👋</span>
            <span style={{ color: "#1a1a2e", fontWeight: 600, fontSize: "14px" }}>
              Welcome back!
            </span>
          </div>

          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            color: "#1a1a2e",
            marginBottom: "16px",
            letterSpacing: "-1px",
          }}>
            Your Campus Hub
          </h1>
          
          <p style={{
            fontSize: "1.1rem",
            color: "#3a3a4e",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Everything happening on campus, all in one place. Stay anonymous, stay informed.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.route)}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "32px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(15, 23, 42, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(15, 23, 42, 0.08)";
              }}
            >
              {/* Gradient accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${feature.color}, ${feature.color}88)`,
              }} />

              <div style={{
                width: "60px",
                height: "60px",
                background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "20px",
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "8px",
              }}>
                {feature.title}
              </h3>

              <p style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                lineHeight: 1.6,
                margin: 0,
              }}>
                {feature.desc}
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "20px",
                color: feature.color,
                fontWeight: 600,
                fontSize: "14px",
              }}>
                <span>Explore</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats / Info Bar */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
          marginTop: "60px",
        }}>
          {[
            { label: "Active Users", value: "1.2k+", icon: "👥" },
            { label: "Confessions Today", value: "89", icon: "🎭" },
            { label: "Campus Events", value: "12", icon: "📅" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                padding: "16px 24px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span style={{ fontSize: "24px" }}>{stat.icon}</span>
              <div>
                <div style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#1a1a2e",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "#4a4a5e",
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}