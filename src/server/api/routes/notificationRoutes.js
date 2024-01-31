const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const notificationRoutes = express.Router();

// Route to get notifications for a user
notificationRoutes.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await prisma.notifications.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).send("Error fetching notifications");
    }
});

// Route to mark a notification as read
notificationRoutes.put("/read/:notificationId", async (req, res) => {
    const { notificationId } = req.params;

    try {
        await prisma.notifications.update({
            where: {
                notification_id: notificationId
            },
            data: {
                read: true
            }
        });
        res.send("Notification marked as read");
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).send("Error updating notification");
    }
});

module.exports = notificationRoutes;
