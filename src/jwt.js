const jwt = require('jsonwebtoken');

const eslintFix = (error) => error;
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '45m',
  algorithm: 'HS256',
};

module.exports = {
  generateToken: ({ displayName, email, image }) =>
    jwt.sign({ displayName, email, image }, TOKEN_SECRET, jwtConfig),

    authToken: (token) => {
      if (!token) {
        throw eslintFix({ status: 401, message: 'Token not found' });
      }

      try {
        const validate = jwt.verify(token, TOKEN_SECRET);
        return validate;
      } catch (error) {
        throw eslintFix({ status: 401, message: 'Expired or invalid token' });
      }
  },
}; 
