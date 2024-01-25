require("dotenv").config();
const express = require("express");
const ViteExpress = require("vite-express");
const authRoutes = require("./api/routes/auth.js");
const profileRoutes = require("./api/routes/profileRoutes.js");
const likeRoutes = require("./api/routes/likeRoutes.js");
const messageRoutes = require("./api/routes/messageRoutes.js");
const cors = require("cors");
const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/message", messageRoutes);
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
