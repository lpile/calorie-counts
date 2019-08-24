var express = require('express');
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;

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

module.exports = router;
