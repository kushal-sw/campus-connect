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
      setError("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Search Students</h2>
      <p className="page-subtitle">Find your friends (or enemies) on campus.</p>

      <div className="card" style={{ maxWidth: "600px", margin: "0 auto 32px" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px" }}>
          <input
            className="input"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ whiteSpace: "nowrap" }}>
            {loading ? "..." : "Search"}
          </button>
        </form>
        {error && <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
      </div>

      <ul className="feed-list" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {results.map((u) => (
          <li key={u.id} className="feed-item">
            <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-main)" }}>
              {u.name}
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px" }}>
              {u.branch} • Year {u.year}
            </p>
            {u.bio && <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.5" }}>{u.bio}</p>}
          </li>
        ))}
        {results.length === 0 && !loading && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "20px" }}>
            No users found yet.
          </p>
        )}
      </ul>
    </div>
  );
}