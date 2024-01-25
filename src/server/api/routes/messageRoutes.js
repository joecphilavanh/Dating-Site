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

// GET inbox messages endpoint
messageRoutes.get('/inbox/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const inbox = await prisma.messages.findMany({
            where: {
                OR: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            },
            orderBy: {
                timestamp: 'asc'
            }
        });

        // Create a Set to store unique sender IDs
        const uniqueSenderIds = new Set();

        // Iterate through messages and add unique sender IDs to the Set
        inbox.forEach(message => {
            if (message.sender_id !== userId) {
                uniqueSenderIds.add(message.sender_id);
            }
        });

        // Convert Set to an array of unique sender IDs
        const uniqueSenderIdsArray = Array.from(uniqueSenderIds);

        // Fetch user information for the unique sender IDs
        const users = await prisma.users.findMany({
            where: {
                user_id: {
                    in: uniqueSenderIdsArray
                }
            },
            select: {
                user_id: true,
                username: true,
                Profiles: {
                    select: {
                        picture_url: true
                    }
                }
            }
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching inbox:', error);
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
