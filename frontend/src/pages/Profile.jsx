// Profile Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    bio: "",
    relationship_status: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load current user
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me"); // backend returns current user
      const user = res.data;

      setForm({
        name: user.name || "",
        email: user.email || "",
        branch: user.branch?.toString() || "",
        year: user.year?.toString() || "",
        bio: user.bio || "",
        relationship_status: user.relationship_status || "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      // Assuming backend has PUT /api/users/me
      await api.put("/users/me", {
        name: form.name,
        branch: form.branch,
        year: Number(form.year),
        bio: form.bio,
        relationship_status: form.relationship_status,
      });

      setMessage("Profile updated");
      fetchProfile();
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div
          className="feature-card"
          style={{
            maxWidth: "360px",
            width: "100%",
            textAlign: "center",
            padding: "18px 18px 20px",
          }}
        >
          <p className="feature-description">Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div className="page-wrapper">
      <div
        className="feature-card"
        style={{ maxWidth: "720px", margin: "0 auto" }}
      >
        {/* Header with avatar and basic info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              height: "52px",
              width: "52px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #6366f1, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {(form.name || form.email || "?")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div>
            <h2
              className="feature-title sky"
              style={{ marginBottom: "2px" }}
            >
              {form.name || "Your Name"}
            </h2>
            <p
              className="feature-description"
              style={{ fontSize: "12px" }}
            >
              {form.email || "your@college.edu"}
            </p>
          </div>
        </div>

        <p
          className="feature-description"
          style={{ marginBottom: "16px" }}
        >
          Manage how you appear across Campus Connect. This is visible to
          other students in search and around the app.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Name
            </label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
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
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Email (read-only)
            </label>
            <input
              className="input"
              value={form.email}
              readOnly
              style={{
                width: "100%",
                borderRadius: "999px",
                border: "1px solid #4b5563",
                background: "#020617",
                color: "#e5e7eb",
                padding: "8px 12px",
                fontSize: "14px",
                opacity: 0.6,
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Branch + Year */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                Branch
              </label>
              <input
                className="input"
                name="branch"
                value={form.branch}
                onChange={handleChange}
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
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                Year
              </label>
              <input
                className="input"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
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
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Bio
            </label>
            <textarea
              className="textarea"
              name="bio"
              value={form.bio}
              onChange={handleChange}
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
          </div>

          {/* Relationship status */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Relationship Status
            </label>
            <input
              className="input"
              name="relationship_status"
              value={form.relationship_status}
              onChange={handleChange}
              placeholder="single / taken / it's complicated"
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
          </div>

          {/* Save button & messages */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{
                border: "none",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #6366f1, #ec4899)",
                color: "white",
                padding: "8px 18px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: saving ? "default" : "pointer",
                opacity: saving ? 0.7 : 1,
                boxShadow: "0 14px 35px rgba(88,28,135,0.65)",
              }}
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>

        {message && (
          <p
            style={{
              color: "#4ade80",
              marginTop: "14px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {message}
          </p>
        )}
        {error && (
          <p
            style={{
              color: "#ef4444",
              marginTop: "14px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}