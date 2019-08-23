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

module.exports = router;

