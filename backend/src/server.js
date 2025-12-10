const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const confessionRoutes = require("./routes/confessionRoutes");
const authRoutes = require("./routes/authRoutes");

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/confessions", confessionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});