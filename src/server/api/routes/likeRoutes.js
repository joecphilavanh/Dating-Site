const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const likesRouter = express.Router();
likesRouter.post('/', async (req, res) => {
    const { liker_id, liked_id } = req.body;

    try {
        const like = await prisma.likes.create({
            data: {
                liker_id,
                liked_id,
            },
        });

        res.status(201).json(like);
    } catch (error) {
        console.error('Error creating like:', error);
        res.status(500).send(error.message);
    }
});

likesRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const likes = await prisma.likes.findMany({
            where: {
                liked_id: userId,
            },
            include: {
                Liker: true,
            },
        });

        res.json(likes);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).send(error.message);
    }
});

module.exports = likesRouter;
