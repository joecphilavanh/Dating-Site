const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const messageRoutes = express.Router();

const createNotification = async (userId, type, message) => {
  try {
    await prisma.notifications.create({
      data: {
        user_id: userId,
        type: type,
        message: message,
      },
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// POST a new message
messageRoutes.post("/", async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  try {
    const newMessage = await prisma.messages.create({
      data: {
        sender_id,
        receiver_id,
        content,
      },
    });

    req.io.to(sender_id).to(receiver_id).emit("newMessage", newMessage);
    const notificationMessage = `You have a new message.`;
    await createNotification(receiver_id, "New Message", notificationMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send(error.message);
  }
});


// GET inbox messages endpoint
messageRoutes.get("/inbox/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const inbox = await prisma.messages.findMany({
      where: {
        OR: [{ sender_id: userId }, { receiver_id: userId }],
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    // Create a Set to store unique sender IDs
    const uniqueSenderIds = new Set();

    // Iterate through messages and add unique sender IDs to the Set
    inbox.forEach((message) => {
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
          in: uniqueSenderIdsArray,
        },
      },
      select: {
        user_id: true,
        username: true,
        Profiles: {
          select: {
            picture_url: true,
          },
        },
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).send(error.message);
  }
});

// GET messages between two users
messageRoutes.get("/history/:userId/:selectedUserId", async (req, res) => {
  const { userId, selectedUserId } = req.params;
  console.log(userId, selectedUserId);

  // Function to validate UUID
  const isValidUUID = (uuid) => {
    const regexExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
    return regexExp.test(uuid);
  };

  // Validate UUIDs
  if (!isValidUUID(userId) || !isValidUUID(selectedUserId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { sender_id: userId, receiver_id: selectedUserId },
          { sender_id: selectedUserId, receiver_id: userId },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },
      select: {
        message_id: true,
        content: true,
        timestamp: true,
        sender_id: true,
        receiver_id: true,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching message history:", error);
    res.status(500).send(error.message);
  }
});

module.exports = messageRoutes;
