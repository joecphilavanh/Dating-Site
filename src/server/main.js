require("dotenv").config();
const express = require("express");
const ViteExpress = require("vite-express");
const authRoutes = require("./api/routes/auth.js");
const profileRoutes = require("./api/routes/profileRoutes.js");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
);
