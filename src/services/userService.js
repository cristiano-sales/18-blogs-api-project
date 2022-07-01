const { User } = require('../database/models');
const { generateToken } = require('../jwt');

const eslintFix = (error) => error;

module.exports = {
  createUser: async ({ displayName, email, password, image }) => {
      try { 
        await User.create({
        displayName, email, password, image,
      });
      return { token: generateToken({ displayName, email, image }) }; 
      } catch (_) {
        throw eslintFix({ status: 409, message: 'User already registered' });
      }
  },
  getUsers: () => User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] }),
  getUserById: (id) => 
    User.findOne({ where: { id }, attributes: ['id', 'displayName', 'email', 'image'] }),
  getUserByEmail: (email) =>
    User.findOne({ where: { email }, attributes: ['id'] }),
  deleteUser: (id) =>
    User.destroy({
      where: { id },
  }),
};
