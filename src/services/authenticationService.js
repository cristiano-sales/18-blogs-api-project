const { User } = require('../database/models');
const { generateToken } = require('../jwt');

const eslintFix = (error) => error;

const authenticate = async ({ password, email }) => {
  const user = await User.findOne({
    attributes: ['displayName', 'email', 'image'],
    where: { email, password },
  });

  if (!user) throw eslintFix({ status: 400, message: 'Invalid fields' });

  const token = generateToken(user.dataValues);

  return { token };
};

module.exports = {
  authenticate,
};
