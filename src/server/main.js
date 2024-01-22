const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const path = require("path");

app.use(cors()); // Enable CORS for all routes

const authRoutes = require("./api/routes/auth");
const profileRoutes = require("./api/routes/profileRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const viteBuildPath = path.join(process.cwd(), "dist");
app.use(express.static(viteBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(viteBuildPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
