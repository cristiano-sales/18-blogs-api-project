const CategoriesSchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define("Categories", {
    name: DataTypes.STRING,
  });
  return CategoryTable;
};

module.exports = CategoriesSchema;
