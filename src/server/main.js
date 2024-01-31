require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");

const authRoutes = require("./api/routes/auth.js");
const profileRoutes = require("./api/routes/profileRoutes.js");
const likeRoutes = require("./api/routes/likeRoutes.js");
const messageRoutes = require("./api/routes/messageRoutes.js");
const suggestionsRoutes = require("./api/routes/suggestionsRoutes.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to attach io to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/suggestions", suggestionsRoutes);


const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

// Catch-all handler for any request that doesn't match the API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// WebSocket setup
io.on('connection', (socket) => {
    console.log('New WebSocket client connected');

    // Handle WebSocket events here

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = { app, server, io };
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
