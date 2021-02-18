const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded_token = jwt.verify(token, config.get('jwtSecret'));
    // set decoded_token.user to req.user so we can use this user in protected routes
    req.user = decoded_token.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
