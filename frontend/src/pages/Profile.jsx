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

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px", color: "var(--text-muted)" }}>Loading profile...</p>;

  return (
    <div className="page-container">
      <h2 className="page-title">My Profile</h2>
      <p className="page-subtitle">Manage your personal information.</p>

      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Name</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Email (read-only)</label>
            <input
              className="input"
              value={form.email}
              readOnly
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Branch</label>
              <input
                className="input"
                name="branch"
                value={form.branch}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Year</label>
              <input
                className="input"
                name="year"
                value={form.year}
                onChange={handleChange}
                type="number"
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Bio</label>
            <textarea
              className="textarea"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontSize: "14px" }}>Relationship Status</label>
            <input
              className="input"
              name="relationship_status"
              value={form.relationship_status}
              onChange={handleChange}
              placeholder="single / taken / it's complicated"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>

        {message && <p style={{ color: "#4ade80", marginTop: "16px", textAlign: "center", fontSize: "14px" }}>{message}</p>}
        {error && <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center", fontSize: "14px" }}>{error}</p>}
      </div>
    </div>
  );
}