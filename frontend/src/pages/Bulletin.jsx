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
    <div className="page-wrapper">
      <div className="feature-card">
        <h2 className="feature-title emerald">Campus Bulletin</h2>
        <p className="feature-description" style={{ marginBottom: "16px" }}>
          Official announcements, events, and campus-wide updates.
        </p>

        {/* New bulletin form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Title (e.g. Tech Fest registrations open)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "999px",
              border: "1px solid #4b5563",
              background: "#020617",
              color: "#e5e7eb",
              padding: "8px 12px",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <textarea
            placeholder="Details of the announcement..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              borderRadius: "14px",
              border: "1px solid #4b5563",
              background: "#020617",
              color: "#e5e7eb",
              padding: "10px 12px",
              fontSize: "14px",
              resize: "vertical",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ fontSize: "12px", color: "#fca5a5" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={posting}
            style={{
              alignSelf: "flex-end",
              border: "none",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #22c55e, #22d3ee)",
              color: "white",
              padding: "6px 16px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: posting ? "default" : "pointer",
              opacity: posting ? 0.7 : 1,
              boxShadow: "0 14px 35px rgba(16,185,129,0.55)",
            }}
          >
            {posting ? "Posting..." : "Post announcement"}
          </button>
        </form>

        {/* Bulletin list */}
        <div style={{ marginTop: "20px" }}>
          {loading ? (
            <p className="feature-description">Loading announcements...</p>
          ) : posts.length === 0 ? (
            <p className="feature-description">No announcements yet.</p>
          ) : (
            posts
              .slice()
              .reverse()
              .map((p) => {
                const created = p.created_at || p.createdAt;
                const formattedDate = created
                  ? new Date(created).toLocaleString()
                  : "Just now";

                return (
                  <div
                    key={p.id}
                    className="feature-card"
                    style={{
                      marginBottom: "10px",
                      boxShadow: "none",
                      background: "rgba(15,23,42,0.95)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#bbf7d0",
                        marginBottom: "4px",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="feature-description"
                      style={{ color: "#e5e7eb", fontSize: "14px" }}
                    >
                      {p.content}
                    </p>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "11px",
                        color: "#9ca3af",
                      }}
                    >
                      Posted • {formattedDate}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}