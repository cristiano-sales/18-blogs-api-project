const express = require('express');
const authController = require('./controllers/authenticationController');
const middlewares = require('./middlewares');

const routes = express.Router();

routes.use('/login', middlewares.requiredFields, authController);

module.exports = routes;
