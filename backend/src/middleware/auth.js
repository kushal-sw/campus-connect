const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";

  console.log("AUTH HEADER:", authHeader); // 👈 TEMPORARY FOR DEBUG

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please authenticate" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Please authenticate" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("JWT verify failed:", err.message);
    return res.status(401).json({ message: "Please authenticate" });
  }
};