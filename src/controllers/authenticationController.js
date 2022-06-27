const express = require('express');

const authRouter = express.Router();

authRouter.post('/', (req, res) => {
  const newUser = req.body;
  return res.status(201).json(newUser);
});

module.exports = authRouter;
