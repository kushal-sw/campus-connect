// Tea Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Tea() {
  const [teaPosts, setTeaPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  // fetch all tea
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
      await api.post("/anon", {
        type: "tea",
        content,
      });
      setContent("");
      fetchTea();
    } catch (err) {
      console.error(err);
      setError("Failed to post tea");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="feature-card">
        <h2 className="feature-title pink">Tea / Gossip Feed</h2>
        <p className="feature-description" style={{ marginBottom: "16px" }}>
          Spill the campus tea. All gossip, no names.
        </p>

        {/* Post form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's the latest drama?"
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
              background: "linear-gradient(90deg, #ec4899, #6366f1)",
              color: "white",
              padding: "6px 16px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: posting ? "default" : "pointer",
              opacity: posting ? 0.7 : 1,
              boxShadow: "0 14px 35px rgba(190,24,93,0.6)",
            }}
          >
            {posting ? "Spilling..." : "Post tea"}
          </button>
        </form>

        {/* Tea list */}
        <div style={{ marginTop: "20px" }}>
          {loading ? (
            <p className="feature-description">Loading tea...</p>
          ) : teaPosts.length === 0 ? (
            <p className="feature-description">
              No tea yet. Campus is suspiciously quiet.
            </p>
          ) : (
            teaPosts
              .slice()
              .reverse()
              .map((t) => {
                const created = t.created_at || t.createdAt;
                const formattedDate = created
                  ? new Date(created).toLocaleString()
                  : "Just now";

                return (
                  <div
                    key={t.id}
                    className="feature-card"
                    style={{
                      marginBottom: "10px",
                      boxShadow: "none",
                      background: "rgba(15,23,42,0.95)",
                    }}
                  >
                    <p
                      className="feature-description"
                      style={{ color: "#e5e7eb", fontSize: "14px" }}
                    >
                      {t.content}
                    </p>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "11px",
                        color: "#9ca3af",
                      }}
                    >
                      Anonymous • {formattedDate}
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