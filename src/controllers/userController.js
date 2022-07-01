const userRouter = require('express').Router();
const userService = require('../services/userService');
const middlewares = require('../middlewares');

userRouter.post('/', middlewares.validateUserData, async (req, res) => {
  const newUserToken = await userService.createUser(req.body);
  return res.status(201).json(newUserToken);
});

userRouter.get('/', middlewares.authenticate, async (req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
});

userRouter.delete('/me', middlewares.authenticate, async (req, res) => {
  const { user: { email: loggedUserEmail } } = res.locals;
  const { dataValues: { id } } = await userService.getUserByEmail(loggedUserEmail);

  const deletedUser = await userService.deleteUser(id);
  if (deletedUser > 0) return res.status(204).end();

  return res.status(400).json({ message: 'Error: User not deleted' });
});

userRouter.get('/:id', middlewares.authenticate, async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
});

module.exports = userRouter;
