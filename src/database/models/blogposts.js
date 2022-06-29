const BlogPostsSchema = (sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define("BlogPost", {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  });

  BlogPostsTable.associate = ({ User }) => {
    BlogPostsTable.belongsTo(User, { as: 'userPost', foreignKey: 'userId' })
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