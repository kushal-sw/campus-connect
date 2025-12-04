// Confessions Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchConfessions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/anon", { params: { type: "confession" } });
      setConfessions(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load confessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setPosting(true);
    setError("");

    try {
      await api.post("/anon", {
        type: "confession",
        content,
      });
      setContent("");
      fetchConfessions();
    } catch (err) {
      console.error(err);
      setError("Failed to post confession");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Anonymous Confessions</h2>
      <p className="page-subtitle">Speak your truth. No names attached.</p>

      <div className="card" style={{ marginBottom: "32px" }}>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Drop your confession..."
            rows={4}
            style={{ marginBottom: "16px" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn-primary" disabled={posting}>
              {posting ? "Posting..." : "Post Confession"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading confessions...</p>
      ) : (
        <ul className="feed-list">
          {confessions.map((c) => (
            <li key={c.id} className="feed-item">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{c.content}</p>
              <div className="feed-meta">
                <span>Anonymous</span>
                <span>•</span>
                <span>
                  {c.created_at || c.createdAt
                    ? new Date(c.created_at || c.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            </li>
          ))}
          {confessions.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
              No confessions yet. Be the first menace.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}