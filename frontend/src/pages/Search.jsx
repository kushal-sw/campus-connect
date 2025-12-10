// Search Page
import { useState } from "react";
import api from "../api/apiClient";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await api.get("/users", { params: { search: query } });
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to search students.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="feature-card">
        <h2 className="feature-title yellow">Search Students</h2>
        <p className="feature-description" style={{ marginBottom: "16px" }}>
          Find people by name and discover who&apos;s part of your campus.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              borderRadius: "999px",
              border: "1px solid #4b5563",
              background: "#020617",
              color: "#e5e7eb",
              padding: "8px 12px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              border: "none",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #facc15, #22c55e)",
              color: "black",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p style={{ fontSize: "12px", color: "#fca5a5", marginBottom: "8px" }}>
            {error}
          </p>
        )}

        {/* Results */}
        <div style={{ marginTop: "8px" }}>
          {loading ? (
            <p className="feature-description">Looking up students...</p>
          ) : results.length === 0 && query.trim() ? (
            <p className="feature-description">
              No students found with that name.
            </p>
          ) : results.length === 0 ? (
            <p className="feature-description">
              Start typing a name to see who shows up.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              {results.map((u) => (
                <div
                  key={u.id}
                  className="feature-card"
                  style={{
                    marginBottom: 0,
                    boxShadow: "none",
                    background: "rgba(15,23,42,0.95)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        height: "32px",
                        width: "32px",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(135deg, #6366f1, #ec4899)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      {u.name ? u.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#e5e7eb",
                        }}
                      >
                        {u.name || "Unknown student"}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                        }}
                      >
                        {u.branch || "Branch N/A"} ·{" "}
                        {u.year ? `Year ${u.year}` : "Year N/A"}
                      </div>
                    </div>
                  </div>

                  {u.bio && (
                    <p
                      className="feature-description"
                      style={{
                        color: "#cbd5f5",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {u.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}