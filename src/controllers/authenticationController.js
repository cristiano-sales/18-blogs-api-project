const express = require('express');
const authService = require('../services/authenticationService');

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
  const newUserToken = await authService.authenticator(req.body);
  return res.status(200).json(newUserToken);
});

module.exports = authRouter;
