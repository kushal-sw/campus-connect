// Home Page

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Campus Connect</h1>
      <button onClick={() => navigate("/confessions")}>Confessions</button>
      <button onClick={() => navigate("/tea")}>Tea</button>
      <button onClick={() => navigate("/bulletin")}>Campus Bulletin</button>
      <button onClick={() => navigate("/profile")}>My Profile</button>
      <button onClick={() => navigate("/search")}>Search Users</button>
    </div>
  );
}

export default Home;