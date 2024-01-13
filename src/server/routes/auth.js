const express = require('express');
const { hashPassword, comparePassword, generateToken } = require('../auth/utils.js');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.users.create({
            data: { username, email, password_hash: hashedPassword },
        });

        res.status(201).json({ message: 'User created successfully', userId: user.user_id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUnique({ where: { email } });
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.user_id);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;

