// api/routes/messageRoutes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const messageRoutes = express.Router();

// POST a new message
messageRoutes.post('/', async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
        const newMessage = await prisma.messages.create({
            data: {
                sender_id,
                receiver_id,
                content
            }
        });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send(error.message);
    }
});

// GET messages between two users
messageRoutes.get('/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    { sender_id: senderId, receiver_id: receiverId },
                    { sender_id: receiverId, receiver_id: senderId }
                ]
            },
            orderBy: {
                timestamp: 'asc'
            }
        });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send(error.message);
    }
});

module.exports = messageRoutes;
