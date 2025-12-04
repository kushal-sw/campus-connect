// Confessions Page
import { useEffect, useState } from "react";
import api from "../api/apiClient";

function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [content, setContent] = useState("");

  const fetchConfessions = async () => {
    const res = await api.get("/anon", { params: { type: "confession" } });
    setConfessions(res.data);
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/anon", { type: "confession", content });
    setContent("");
    fetchConfessions();
  };

  return (
    <div>
      <h2>Anonymous Confessions</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Drop your confession..."
        />
        <button type="submit">Post</button>
      </form>

      <ul>
        {confessions.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Confessions;