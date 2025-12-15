const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { prisma } = require("../utils/prismaClient"); // adjust path if your prisma import differs

// GET /api/bulletin
// returns list of bulletin posts (newest first)
router.get("/", auth, async (req, res) => {
  try {
    const posts = await prisma.bulletinPost.findMany({
      orderBy: { created_at: "desc" },
      include: { user: { select: { id: true, name: true, email: true } } }, // optional
    });
    return res.json(posts);
  } catch (err) {
    console.error("GET /api/bulletin error:", err);
    return res.status(500).json({ message: "Failed to load bulletin" });
  }
});

// POST /api/bulletin
// create new bulletin (verified user required)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    // get user id from middleware (some middlewares set req.user.id)
    const uid = req.user?.id ?? req.user?.userId;
    if (!uid) return res.status(401).json({ message: "Please authenticate" });

    // ensure number type if schema uses Int
    const userId = Number(uid);

    const post = await prisma.bulletinPost.create({
      data: {
        title: String(title).trim(),
        content: String(content).trim(),
        tag: tag ? String(tag).trim() : null, // optional tag: Event/Notice/LostFound/Opportunity
        user_id: userId,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error("POST /api/bulletin error:", err);
    return res.status(500).json({ message: "Failed to create bulletin post" });
  }
});

module.exports = router;