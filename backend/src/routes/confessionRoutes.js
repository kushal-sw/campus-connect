/**
 * POST /api/confessions/:id/replies
 * Add a reply to a confession


*/

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// CREATE CONFESSION
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res
        .status(400)
        .json({ message: "Content is required for a confession." });
    }

    const confession = await prisma.confession.create({
      data: { content: content.trim() },
    });

    res.status(201).json(confession);
  } catch (err) {
    console.error("Error creating confession:", err);
    res.status(500).json({ message: "Server error creating confession." });
  }
});

// GET ALL CONFESSIONS
router.get("/", async (req, res) => {
  try {
    const confessions = await prisma.confession.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(confessions);
  } catch (err) {
    console.error("Error fetching confessions:", err);
    res.status(500).json({ message: "Server error fetching confessions." });
  }
});

// ADD REPLY
router.post("/:id/replies", async (req, res) => {
  try {
    const confessionId = Number(req.params.id);
    const { content } = req.body;

    if (!confessionId || Number.isNaN(confessionId)) {
      return res.status(400).json({ message: "Invalid confession id." });
    }

    if (!content || !content.trim()) {
      return res
        .status(400)
        .json({ message: "Content is required for a reply." });
    }

    const reply = await prisma.confessionReply.create({
      data: {
        content: content.trim(),
        confessionId,
      },
    });

    res.status(201).json(reply);
  } catch (err) {
    console.error("Error creating reply:", err);
    res.status(500).json({ message: "Server error creating reply." });
  }
});

// GET REPLIES FOR ONE CONFESSION
router.get("/:id/replies", async (req, res) => {
  try {
    const confessionId = Number(req.params.id);

    if (!confessionId || Number.isNaN(confessionId)) {
      return res.status(400).json({ message: "Invalid confession id." });
    }

    const replies = await prisma.confessionReply.findMany({
      where: { confessionId },
      orderBy: { createdAt: "asc" },
    });

    res.json(replies);
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ message: "Server error fetching replies." });
  }
});

module.exports = router;