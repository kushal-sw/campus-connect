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

// Create post (robust, connect via foreign key user_id)
router.post('/', authMiddleware, async (req, res) => {
  const { type, content } = req.body ?? {};

  // Basic validation
  if (!type || !content || typeof content !== 'string') {
    return res.status(400).json({ message: 'type and content are required' });
  }

  const normalizedType = String(type).trim().toUpperCase();

  // Debug: log req.user to verify middleware
  console.log('REQ USER in anon POST:', req.user);

  // Try to extract user id from middleware or token fallback
  let uid = req.user?.id ?? req.user?.userId ?? null;

  if (!uid) {
    // fallback: try to parse from Authorization token directly
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];
      if (token) {
        const payload = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        uid = payload?.id ?? payload?.userId ?? null;
      }
    } catch (e) {
      console.warn('anonRoutes: token parse fallback failed', e.message);
    }
  }

  // normalize numeric id
  let idNum = null;
  if (uid) {
    idNum = Number(uid);
    if (Number.isNaN(idNum)) idNum = null;
  }

  const data = {
    type: normalizedType,
    content: content.trim(),
  };

  // If we have a numeric user id, set the foreign key directly (user_id)
  if (idNum) {
    data.user_id = idNum;
  }

  try {
    const post = await prisma.anonymousPost.create({ data });
    return res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    console.error('Failed to create anon post:', err);
    if (err?.name === 'PrismaClientValidationError' && /Argument `user` is missing/.test(String(err))) {
      return res.status(400).json({
        message: 'Failed to create post',
        error: 'Post creation requires a user relationship. Either authenticate or make anonymousPost.user optional in Prisma schema or use user_id foreign key.',
      });
    }
    return res.status(400).json({ message: 'Failed to create post', error: String(err) });
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
