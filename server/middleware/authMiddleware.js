const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw new Error('Authorization header is missing');
        }
        
        // Extract the token from the header
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            throw new Error('Invalid authorization header format');
        }
        const decodedToken = tokenParts[1];

        const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': decodedToken });

        if (!user) {
            throw new Error('User not found');
        }

        req.token = decodedToken;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: error.message || 'Please authenticate.' });
    }
};

module.exports = auth;
