const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define("User", {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING    
  });
  UserTable.associate = ({ BlogPost }) => {
    UserTable.hasMany(BlogPost, { as: 'posts', foreignKey: 'userId' })
  }
  return UserTable;
};

module.exports = UserSchema;
