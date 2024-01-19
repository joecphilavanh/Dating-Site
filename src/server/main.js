const express = require('express');
const app = express();

const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

const authRoutes = require('./api/routes/auth');
const profileRoutes = require('./api/routes/profileRoutes');

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Serve static files
const viteBuildPath = path.join(process.cwd(), 'dist');
app.use(express.static(viteBuildPath));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});