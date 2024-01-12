const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const profilesRouter = express.Router();

// Helper function to parse user_id
const parseUserId = (id) => {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        throw new Error('Invalid user ID');
    }
    return userId;
};

// GET a user's profile by user_id
profilesRouter.get('/:userId', async (req, res) => {
    try {
        const userId = parseUserId(req.params.userId);
        const profile = await prisma.profiles.findUnique({
            where: { user_id: userId }
        });
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// POST a new user profile
profilesRouter.post('/', async (req, res) => {
    try {
        const newProfile = await prisma.profiles.create({
            data: req.body
        });
        res.status(201).json(newProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// PUT to update a user's profile by user_id
profilesRouter.put('/:userId', async (req, res) => {
    try {
        const userId = parseUserId(req.params.userId);
        const updatedProfile = await prisma.profiles.update({
            where: { user_id: userId },
            data: req.body
        });
        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// DELETE a user's profile by user_id
profilesRouter.delete('/:userId', async (req, res) => {
    try {
        const userId = parseUserId(req.params.userId);
        await prisma.profiles.delete({
            where: { user_id: userId }
        });
        res.status(204).send('Profile deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

module.exports = profilesRouter;