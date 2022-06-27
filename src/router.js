const express = require('express');
const authController = require('./controllers/authenticationController');

const routes = express.Router();

routes.use('/login', authController);

module.exports = routes;
