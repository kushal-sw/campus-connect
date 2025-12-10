import { useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function ConfessionComposer({ onPosted }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const maxChars = 300;
  const remaining = maxChars - content.length;
  const isOver = remaining < 0;

  const handlePost = async () => {
    if (!content.trim()) {
      setError("Write something first.");
      return;
    }
    if (isOver) {
      setError("Too long. Try to keep it shorter.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/confessions", { content: content.trim() });
      setContent("");
      onPosted && onPosted();
    } catch (e) {
      console.error(e);
      setError("Could not post confession. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confession-composer-card">
      <div className="confession-composer-header">
        <div>
          <h2>Anonymous Confessions</h2>
          <p>Drop your thoughts. No names, no judgment.</p>
        </div>
      </div>

      <textarea
        className="confession-textarea"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      <div className="confession-composer-footer">
        <div className={`confession-char-count ${isOver ? "over" : ""}`}>
          {remaining} characters left
        </div>
        <div className="confession-composer-actions">
          {error && <span className="confession-error">{error}</span>}
          <button
            className="confession-post-btn"
            onClick={handlePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post confession"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RepliesSection({ confessionId }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [text, setText] = useState("");

  const loadReplies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/confessions/${confessionId}/replies`);
      setReplies(res.data);
    } catch (e) {
      console.error("Error fetching replies", e);
    } finally {
      setLoading(false);
    }
  }, [confessionId]);

  useEffect(() => {
    loadReplies();
  }, [loadReplies]);

  const handlePostReply = async () => {
    if (!text.trim()) return;
    setPosting(true);
    try {
      await api.post(`/confessions/${confessionId}/replies`, {
        content: text.trim(),
      });
      setText("");
      await loadReplies();
    } catch (e) {
      console.error("Error posting reply", e);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="replies-wrapper">
      {loading && replies.length === 0 && (
        <p className="replies-empty">Loading replies...</p>
      )}

      {replies.map((reply) => (
        <div key={reply.id} className="reply-card">
          <p>{reply.content}</p>
          <small>{formatDate(reply.createdAt)}</small>
        </div>
      ))}

      <div className="reply-composer">
        <input
          className="reply-input"
          placeholder="Reply anonymously..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="reply-btn"
          onClick={handlePostReply}
          disabled={posting}
        >
          {posting ? "Posting..." : "Reply"}
        </button>
      </div>
    </div>
  );
}

function ConfessionItem({ confession }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="confession-card">
      <div className="confession-card-header">
        <div className="confession-avatar">😶</div>
        <div>
          <div className="confession-meta-top">Anonymous</div>
          <div className="confession-meta-sub">{formatDate(confession.createdAt)}</div>
        </div>
      </div>

      <p className="confession-content">{confession.content}</p>

      <div className="confession-card-footer">
        <button
          className="confession-reply-toggle"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide replies" : "View & reply"}
        </button>
      </div>

      {open && <RepliesSection confessionId={confession.id} />}
    </div>
  );
}

function ConfessionFeed({ refreshKey }) {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/confessions");
        setConfessions(res.data);
      } catch (e) {
        console.error("Error loading confessions", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refreshKey]);

  if (loading && confessions.length === 0) {
    return <p className="confession-empty">Loading confessions...</p>;
  }

  if (!loading && confessions.length === 0) {
    return (
      <p className="confession-empty">
        No confessions yet. Be the first to start the chaos.
      </p>
    );
  }

  return (
    <div className="confession-feed">
      {confessions.map((c) => (
        <ConfessionItem key={c.id} confession={c} />
      ))}
    </div>
  );
}

export default function ConfessionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePosted = () => setRefreshKey((k) => k + 1);

  return (
    <div className="page-wrapper confession-page">
      <ConfessionComposer onPosted={handlePosted} />
      <ConfessionFeed refreshKey={refreshKey} />
    </div>
  );
}