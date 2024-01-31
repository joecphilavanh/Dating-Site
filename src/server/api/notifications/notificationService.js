const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = createNotification;