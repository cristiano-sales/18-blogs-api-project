const { Category } = require('../database/models');

module.exports = {
  createCategory: ({ name }) => Category.create({ name }),
  getCategories: () => Category.findAll(),
};
