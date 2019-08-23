var express = require('express');
var router = express.Router();
var Food = require('../../../models').Food;

/* GET all foods */
router.get('/', function (req, res) {
  Food.findAll()
  .then(foods => {
    if (!foods.length) {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send({ error: 'Database Is Empty' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(foods));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
  });
});

/* POST new food */
router.post('/', function(req, res) {
  if (req.body.food.name && req.body.food.calories) {
    Food.create({
      name: req.body.food.name,
      calories: req.body.food.calories
    })
    .then(food => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).send(JSON.stringify(food));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error })
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: 'Food Needs Name/Calories' })
  }
});

/* DELETE single food */
router.delete('/:id', function(req, res) {
  Food.findOne({ where: { id: req.params.id }})
  .then(food => {
    food.destroy();
    res.setHeader('Content-Type', 'application/json');
    res.status(204).send()
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: 'Food Not Found' });
  });
});

/* GET single food */
router.get('/:id', function (req, res) {
  Food.findOne({ where: { id: req.params.id }})
  .then(food => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send({ error: 'Food Not Found' });
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
  });
});

/* UPDATE a single food */
router.patch('/:id', function (req, res) {
  if (req.body.food.name && req.body.food.calories) {
    Food.findOne({ where: { id: req.params.id }})
    .then(food => {
      if (!food) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send({ error: 'Food Not Found' });
      } else {
        Food.update(
          {
            name: req.body.food.name,
            calories: req.body.food.calories
          },
          {
            returning: true,
            where: { id: parseInt(req.params.id) }
          })
          .then(([rowsUpdate, [updatedFood]]) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(202).send(JSON.stringify(updatedFood));
          })
          .catch(error => {
            res.setHeader('Content-Type', 'application/json');
            res.status(406).send({ error: 'Unable To Update' })
          }
        );
      }
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({ error })
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: 'Food Needs Name/Calories' })
  }
});

module.exports = router;
