const Joi = require('joi');
// linguagem de descrição de schema e validação de dados

const validateUserData = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

module.exports = validateUserData;
