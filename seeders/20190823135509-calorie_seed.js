'use strict';

var Meal = require ('../models').Meal
var Food = require ('../models').Food

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Meals', [{
				name: 'Breakfast',
      	createdAt: new Date(),
      	updatedAt: new Date()
			},
			{
				name: 'Snack',
      	createdAt: new Date(),
      	updatedAt: new Date()
			}
    ], {});
			
		let breakfast = await Meal.findOne({
  	  where: {
  	    name: 'Breakfast'
  	  }
 	  })

    let snack = await Meal.findOne({
      where: {
        name: 'Snack'
      }
    })

		await queryInterface.bulkInsert('Food', [{
      name: 'Banana',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Yogurt',
      calories: 550,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Apple',
      calories: 220,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});

		let apple = await Food.findOne({
      where: {
        name: 'Apple'
      }
    })

    let yogurt = await Food.findOne({
      where: {
        name: 'Yogurt'
      }
    })

    let banana = await Food.findOne({
      where: {
        name: 'Banana'
      }
    })

		return await queryInterface.bulkInsert('FoodMeals', [{
			MealId: breakfast.id,
			FoodId: yogurt.id,
      createdAt: new Date(),
      updatedAt: new Date()
		},
		{
			MealId: breakfast.id,
			FoodId: banana.id,
      createdAt: new Date(),
      updatedAt: new Date()
		},
		{
			MealId: breakfast.id,	
			FoodId: apple.id,
      createdAt: new Date(),
      updatedAt: new Date()
		},
		{
			MealId: snack.id,	
			FoodId: banana.id,
      createdAt: new Date(),
      updatedAt: new Date()
		},
		{
			MealId: snack.id,
			FoodId: apple.id,	
      createdAt: new Date(),
      updatedAt: new Date()
		}
		], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('FoodMeals', null, {});
    return queryInterface.bulkDelete('Food', null, {});
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
