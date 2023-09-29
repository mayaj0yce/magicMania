const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(user) {
  try {
    const token = jwt.sign(
      {
        id: user._id, 
        username: user.username,
      },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
    return token;
  } catch (error) {
    throw new Error('Error generating JWT token: ' + error);
  }
}

// Function to verify and decode a JWT token
function verifyToken(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error('Error verifying JWT token: ' + error);
  }
}

module.exports = {
  generateToken,
  verifyToken,
};