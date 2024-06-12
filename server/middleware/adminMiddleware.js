const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 
const adminMiddleware = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract token from Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token,secretKey);
    
    // Check if user has admin role
    if (decoded && decoded.role === 'admin') {
      // Attach user information to the request object
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = adminMiddleware;
