var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var FoodMeals = require('../../../models').FoodMeals;

/* GET all meals */
router.get("/", function(req, res, next) {
	Meal.findAll({
 		include : [{
 			model: Food,
 			as: 'foods'
 		}]
	})
	.then(meals => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(meals));
	})
	.catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
	});
});

/* GET single meal */
router.get('/:meal_id/foods', function (req, res) {
  Meal.findOne({
		where: {
			id: req.params.meal_id
		},
		include : [{
 			model: Food,
 			as: 'foods'
 		}]
	})
  .then(meal => {
    if (meal) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meal));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send({ error: 'Meal Not Found' });
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
  });
});

/* DELETE food from meal */
router.delete('/:meal_id/foods/:id', function(req, res) {
  Meal.findOne({ where: { id: req.params.meal_id }})
	.then(meal => {
    if (meal) {
			Food.findOne({ where: { id: req.params.id }})
		  .then(food => {
		    if (food) {
					meal.removeFoods(food);
		      res.setHeader('Content-Type', 'application/json');
		      res.status(204).send();
		    } else {
		      res.setHeader('Content-Type', 'application/json');
		      res.status(404).send({ error: 'Food Not Found' });
		    }
		  })
		  .catch(error => {
		    res.setHeader('Content-Type', 'application/json');
		    res.status(500).send({ error })
		  });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send({ error: 'Meal Not Found' });
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
  });
});

router.post("/:meal_id/foods/:id", async function(req, res, next) {
  var meal = await Meal.findOne({ where: { id: req.params.meal_id }})
  var food = await Food.findOne({ where: { id: req.params.id }})
	if (food && meal) {
		var foodmeal = await FoodMeals.findOne({ where: {FoodId: food.id, MealId: meal.id}})
	}
	else {
		var foodmeal = null
	}

  if (meal && food && foodmeal === null) {
    FoodMeals.create({
      FoodId: food.id,
      MealId: meal.id
    })
  	.then(foodMeals => {
  	  res.setHeader('Content-Type', 'application/json');
  	  res.status(201).send(JSON.stringify({message: `Successfully added ${food.name} to ${meal.name}`}));
  		})
  	.catch(error => {
  	  res.setHeader('Content-Type', 'application/json');
  	  res.status(500).send({ error })
  	});
	}
	else if (foodmeal !== null) {
    res.setHeader('Content-Type', 'application/json');
    res.status(406).send({ error: 'The food already belongs to this meal' })
	}
	else if (!food || !meal) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: 'Valid food and meal required' })
	}
	else {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
	}
});

module.exports = router;
