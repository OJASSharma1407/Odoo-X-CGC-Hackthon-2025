const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET; // same one used in login route

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    console.log('❌ No token found');
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Assuming token is signed like { user: { id } }
    console.log('✅ User authenticated:', req.user);
    next();
  } catch (error) {
    console.log('❌ Invalid token:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = fetchuser;
