const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const generateToken = (userId, role) => {
  return jwt.sign({ _id: userId, role }, secretKey, { expiresIn: '1h' });
};

module.exports = { generateToken };
