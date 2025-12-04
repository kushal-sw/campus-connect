const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
    res.json(req.user);
});

// Update current user profile
router.put('/me', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'branch', 'year', 'bio', 'relationship_status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: req.body,
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
    }
});

// Search users
router.get('/', authMiddleware, async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.json([]);
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
});

module.exports = router;
