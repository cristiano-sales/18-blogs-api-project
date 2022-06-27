const Joi = require('joi');
// linguagem de descrição de schema e validação de dados

const emailPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = emailPassword; 
