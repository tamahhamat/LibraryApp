const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../Models/queries');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ message: 'Token verification failed' });
            }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { authenticateToken };