
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'privatesecret321', (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;

    next();
  });
};
