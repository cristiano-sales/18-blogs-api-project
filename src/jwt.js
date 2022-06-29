const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '45m',
  algorithm: 'HS256',
};

const generateToken = ({ displayName, email, image }) =>
  jwt.sign({ displayName, email, image }, TOKEN_SECRET, jwtConfig);

module.exports = {
  generateToken,
};
