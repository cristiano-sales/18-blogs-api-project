const express = require('express');
const authService = require('../services/authenticationService');
const middlewares = require('../middlewares');

const authRouter = express.Router();

authRouter.post('/', middlewares.isNotEmpty, async (req, res) => {
  const token = await authService.authenticate(req.body);
  return res.status(200).json(token);
});

module.exports = authRouter;
