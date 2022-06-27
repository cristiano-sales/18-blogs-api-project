const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretJWT';

const generateToken = ({ displayName, email, image }) =>
  jwt.sign({ displayName, email, image }, TOKEN_SECRET);

module.exports = {
  generateToken,
};
