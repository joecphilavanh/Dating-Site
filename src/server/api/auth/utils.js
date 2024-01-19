const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not set");
    }
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const parseUserId = (id) => {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
        throw new Error('Invalid user ID');
    }
    return userId;
};

const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
};

module.exports = { hashPassword, comparePassword, generateToken, parseUserId, isValidDate };
