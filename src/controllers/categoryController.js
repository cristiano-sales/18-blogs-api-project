const categoryRouter = require('express').Router();
const categoryService = require('../services/categoryService');

categoryRouter.post('/', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: '"name" is required' });
  const category = await categoryService.createCategory(req.body);
  return res.status(201).json(category);
});

categoryRouter.get('/', async (req, res) => {
  const categories = await categoryService.getCategories();
  return res.status(200).json(categories);
});

module.exports = categoryRouter;
