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

/**
 * hasMany, tem muitos
 * A associação A.hasMany(B) significa que existe
 * um relacionamento Um-para-Muitos entre A e B,
 * com a chave estrangeira sendo definida no modelo de destino (B).
 *  
 */
