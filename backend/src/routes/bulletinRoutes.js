const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all bulletin posts
router.get('/', authMiddleware, async (req, res) => {
    try {
        const posts = await prisma.bulletinPost.findMany({
            orderBy: { created_at: 'desc' },
            include: { user: { select: { name: true, email: true } } },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bulletins', error: error.message });
    }
});

// Create bulletin post
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await prisma.bulletinPost.create({
            data: {
                title,
                content,
                user_id: req.user.id,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create bulletin', error: error.message });
    }
});

// Get single bulletin post
router.get('/:id', authMiddleware, async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        const post = await prisma.bulletinPost.findUnique({
            where: { id: postId },
            include: { user: { select: { name: true, email: true } } },
        });
        if (!post) {
            return res.status(404).json({ message: 'Bulletin not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bulletin', error: error.message });
    }
});

module.exports = router;
