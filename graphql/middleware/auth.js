const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user');

// Middleware function to verify JWT tokens
async function authenticateToken(req, res, next) {
  // Extract the token from the request headers (use the same name as in the frontend)
  const authToken = req.header('Authorization');

  if (!authToken) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(authToken.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Check if the token is associated with an existing user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }
    
    // Attach user information to the request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = authenticateToken;
