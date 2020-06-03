'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Paniers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ProduitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Paniers');
  }
};