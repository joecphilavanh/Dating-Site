const express = require('express');
const app = express();

const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Serve static files
const viteBuildPath = path.join(process.cwd(), 'dist');
app.use(express.static(viteBuildPath));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});