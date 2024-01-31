const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const suggestionsRoutes = express.Router();

suggestionsRoutes.get("/matchMaking/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUserProfiles = await prisma.profiles.findMany({
      where: { user_id: userId },
    });
    const currentUserProfile = currentUserProfiles[0];
    if (!currentUserProfile) {
      return res.status(404).send("User profile not found");
    }
    const profiles = await prisma.profiles.findMany({
      where: {
        AND: [
            { looking_for: currentUserProfile.looking_for },
          { orientation: currentUserProfile.orientation },
          { NOT: { user_id: userId } },
        ],
      },
      select: {
        name: true,
        orientation: true,
        picture_url: true,
        birthdate: true,
        profile_id: true,


      },
    });
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles for match making:", error);
    res.status(500).send(error.message);
  }
});

module.exports = suggestionsRoutes;
