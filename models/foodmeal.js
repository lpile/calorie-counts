'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodMeals = sequelize.define('FoodMeals', {
    MealId: DataTypes.BIGINT,
    FoodId: DataTypes.BIGINT
  }, {});
  FoodMeals.associate = function(models) {
  };
  return FoodMeals;
};
