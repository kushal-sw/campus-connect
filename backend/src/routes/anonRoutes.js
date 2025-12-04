const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get posts by type
router.get('/', authMiddleware, async (req, res) => {
    const { type } = req.query;
    try {
        const where = type ? { type: type.toUpperCase() } : {};
        const posts = await prisma.anonymousPost.findMany({
            where,
            orderBy: { created_at: 'desc' },
            include: {
                _count: {
                    select: { upvotedBy: true }
                }
            }
        });

        // Transform to include upvote count
        const postsWithCount = posts.map(post => ({
            ...post,
            upvotes: post._count.upvotedBy
        }));

        res.json(postsWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
});

// Create post
router.post('/', authMiddleware, async (req, res) => {
    const { type, content } = req.body;
    try {
        const post = await prisma.anonymousPost.create({
            data: {
                type: type.toUpperCase(),
                content,
                user_id: req.user.id,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create post', error: error.message });
    }
});

// Upvote post
router.post('/:id/upvote', authMiddleware, async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        // Check if already upvoted
        const existingUpvote = await prisma.upvote.findUnique({
            where: {
                user_id_post_id: {
                    user_id: req.user.id,
                    post_id: postId,
                },
            },
        });

        if (existingUpvote) {
            return res.status(400).json({ message: 'Already upvoted' });
        }

        await prisma.upvote.create({
            data: {
                user_id: req.user.id,
                post_id: postId,
            },
        });

        // Increment count in post (optional, since we count relations, but good for quick access if we kept the field)
        // We kept 'upvotes' int field in schema, so let's update it
        const post = await prisma.anonymousPost.update({
            where: { id: postId },
            data: { upvotes: { increment: 1 } },
        });

        res.json(post);
    } catch (error) {
        res.status(400).json({ message: 'Upvote failed', error: error.message });
    }
});

module.exports = router;
