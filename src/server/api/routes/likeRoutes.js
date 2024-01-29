const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const likesRouter = express.Router();
likesRouter.post("/", async (req, res) => {
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
    console.error("Error creating like:", error);
    res.status(500).send(error.message);
  }
});

likesRouter.delete("/:likeId", async (req, res) => {
  const { likeId } = req.params;

  try {
    await prisma.likes.delete({
      where: { like_id: likeId },
    });
    res.status(200).send("Like removed");
  } catch (error) {
    console.error("Error removing like", error);
    res.status(500).send(error.message);
  }
});

likesRouter.get("/liked/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await prisma.likes.findMany({
      where: {
        liked_id: userId,
      },
      include: {
        Liker: {
          include: {
            Profiles: {
              select: {
                name: true,
                picture_url: true,
                birthdate: true,
                orientation: true,
                looking_for: true,
              },
            },
          },
        },
      },
    });

    const transformedLikes = likes.map((like) => ({
      like_id: like.like_id,
      likerName: like.Liker?.Profiles[0]?.name || "Unknown",
      likerPicture: like.Liker?.Profiles[0]?.picture_url,
      likerbirthdate: like.Liker?.Profiles[0]?.birthdate,
      likerorientation: like.Liker?.Profiles[0]?.orientation,
      likerlooking_for: like.Liker?.Profiles[0]?.looking_for,
      liked_id: like.liked_id,
    }));

    res.json(transformedLikes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).send(error.message);
  }
});

likesRouter.get("/liker/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const likes = await prisma.likes.findMany({
      where: {
        liker_id: userId,
      },
    });
    console.log(likes);

    res.send(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).send(error.message);
  }
});
module.exports = likesRouter;
