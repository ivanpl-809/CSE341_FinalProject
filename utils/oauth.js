const bcrypt = require('bcrypt');

// Function to check password
async function checkPassword(enteredPassword, storedHash) {
  try {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    return match;
  } catch (err) {
    console.error('Error comparing passwords:', err);
    return false;
  }
}

// Function to hash password
async function getPasswordHash(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
}

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.user === undefined) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
}

module.exports = { checkPassword, getPasswordHash, isAuthenticated };