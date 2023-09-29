const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hasing password' + error);
    }
}

// Function to compare a password with its hash
async function comparePasswords(inputPassword, hashedPassword) {
    try {
      const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
      return passwordMatch;
    } catch (error) {
      throw new Error('Error comparing passwords: ' + error);
    }
  }
  
  module.exports = {
    hashPassword,
    comparePasswords,
  };