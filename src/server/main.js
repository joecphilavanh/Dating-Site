require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware to attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/api/auth", require("./api/routes/auth.js"));
app.use("/api/profile", require("./api/routes/profileRoutes.js"));
app.use("/api/like", require("./api/routes/likeRoutes.js"));
app.use("/api/message", require("./api/routes/messageRoutes.js"));

const distPath = path.resolve(__dirname, "../../dist");
app.use(express.static(distPath));

// Catch-all handler for any request that doesn't match the API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// WebSocket setup
io.on("connection", (socket) => {
  console.log("New WebSocket client connected");

  // Handle WebSocket events here
  socket.on("chat message", (msg, clientOffset, callback) => {
    // Your message handling logic here
    console.log(`Received message: ${msg}`);

    // Broadcasting the message to all clients
    io.emit("chat message", msg, result.lastID);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
