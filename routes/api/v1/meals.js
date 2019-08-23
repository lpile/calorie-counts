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

module.exports = router;
