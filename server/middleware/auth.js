const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Log incoming authorization header
    console.log('Auth Header:', req.headers.authorization);

    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;