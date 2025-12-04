export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Campus Connect – Home</h1>
      <p>You are logged in. This will later become your hub (Confessions / Tea / Bulletin).</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}