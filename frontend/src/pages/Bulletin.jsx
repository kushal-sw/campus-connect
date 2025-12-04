// Bulletin Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Bulletin() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchBulletin = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bulletin");
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load bulletin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulletin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setPosting(true);
    setError("");

    try {
      await api.post("/bulletin", { title, content });
      setTitle("");
      setContent("");
      fetchBulletin();
    } catch (err) {
      console.error(err);
      setError("Failed to post to bulletin");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Campus Bulletin</h2>
      <p className="page-subtitle">Official announcements and important notices.</p>

      <div className="card" style={{ marginBottom: "32px" }}>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <textarea
            className="textarea"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ marginBottom: "16px" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn-primary" disabled={posting}>
              {posting ? "Posting..." : "Post to Bulletin"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "#ef4444", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading bulletin...</p>
      ) : (
        <ul className="feed-list">
          {posts.map((p) => (
            <li key={p.id} className="feed-item">
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "var(--text-main)" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-muted)" }}>{p.content}</p>
              <div className="feed-meta" style={{ marginTop: "12px" }}>
                <span>
                  {p.created_at || p.createdAt
                    ? new Date(p.created_at || p.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            </li>
          ))}
          {posts.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
              No bulletin posts yet.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}