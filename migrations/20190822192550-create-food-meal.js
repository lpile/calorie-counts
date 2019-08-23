'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FoodMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MealId: {
        type: Sequelize.BIGINT,
				references: {
        	model: 'Meals',
        	key: 'id'
        },
				onUpdate: "CASCADE",
        onDelete: "SET NULL"				
      },
      FoodId: {
        type: Sequelize.BIGINT, 
				references: {
        	model: 'Food',
        	key: 'id'
        },
				onUpdate: "CASCADE",
        onDelete: "SET NULL"				
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FoodMeals');
  }
};
