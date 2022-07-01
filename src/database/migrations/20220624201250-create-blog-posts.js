'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE', // Uma operação de atualização em uma tabela referenciada se propaga (cascade = em cascata) para as chaves estrangeiras correspondentes. Ou seja, ao modificar um registro em uma tabela, um registro relacionado em uma coluna de chave estrangeira em outra tabela tem seu valor automaticamente atualizado.
        onDelete: 'CASCADE' // ON DELETE CASCADE – Uma operação de exclusão em uma tabela referenciada se propaga (cascade = em cascata) para as chaves estrangeiras correspondentes. Ou seja, ao excluir um registro em uma tabela, um registro relacionado em outra tabela é automaticamente excluído.
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
