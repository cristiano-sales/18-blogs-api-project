const express = require('express');
const authController = require('./controllers/authenticationController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const middlewares = require('./middlewares');

const routes = express.Router();

routes.use('/login', authController);
routes.use('/user', userController);
routes.use('/categories', middlewares.authenticate, categoryController);
routes.use('/post', middlewares.authenticate, blogPostController);

module.exports = routes;
