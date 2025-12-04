// Tea Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Tea() {
  const [teaPosts, setTeaPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchTea = async () => {
    try {
      setLoading(true);
      const res = await api.get("/anon", { params: { type: "tea" } });
      setTeaPosts(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTea();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setPosting(true);
    setError("");

    try {
      await api.post("/anon", { type: "tea", content });
      setContent("");
      fetchTea();
    } catch (err) {
      console.error(err);
      setError("Failed to spill tea");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Tea / Gossip Feed</h2>
      <p className="page-subtitle">What's buzzing on campus? Spill it here.</p>

      <div className="card" style={{ marginBottom: "32px" }}>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Spill some campus tea..."
            rows={4}
            style={{ marginBottom: "16px" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn-primary" disabled={posting}>
              {posting ? "Posting..." : "Post Tea"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading tea...</p>
      ) : (
        <ul className="feed-list">
          {teaPosts.map((t) => (
            <li key={t.id} className="feed-item">
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{t.content}</p>
              <div className="feed-meta">
                <span>Anonymous</span>
                <span>•</span>
                <span>
                  {t.created_at || t.createdAt
                    ? new Date(t.created_at || t.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            </li>
          ))}
          {teaPosts.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
              No tea yet. Campus is too quiet.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}