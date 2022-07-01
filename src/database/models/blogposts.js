const BlogPostsSchema = (sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  BlogPostsTable.associate = ({ User }) => {
    BlogPostsTable.belongsTo(User, { as: 'user', foreignKey: 'userId' })
  }
  return BlogPostsTable;
};

module.exports = BlogPostsSchema;

/**
* belongsTo, pertence a
* A associação A.belongsTo(B) significa que existe
* um relacionamento Um-para-Um entre Ae B,
* com a chave estrangeira sendo definida no modelo de origem (A)
*/
