'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
		Food.belongsToMany(models.Meal, 
			{ through: 'FoodMeals',
				as: 'meals',
       	foreignKey: 'FoodId',
				otherKey: 'MealId',
       	onDelete: 'CASCADE'
     });
  };
  return Food;
};
