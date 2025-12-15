const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const confessionRoutes = require("./routes/confessionRoutes");
const authRoutes = require("./routes/authRoutes");
const anonRoutes = require("./routes/anonRoutes");
const bulletinRoutes = require("./routes/bulletinRoutes");
const userRoutes = require("./routes/userRoutes");

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/confessions", confessionRoutes);
app.use("/api/anon", anonRoutes);
app.use("/api/bulletin", bulletinRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});