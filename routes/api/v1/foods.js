
var express = require('express');
var router = express.Router();
var Food = require('../../../models').Food;

/* GET all foods */
router.get('/', function (req, res) {
  Food.findAll()
    .then(foods => {
      if (foods.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({ error: 'Database Is Empty' }));
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

/* GET single food */
router.get('/:id', function (req, res) {
  Food.findOne({ where: { id: req.params.id }})
  .then(food => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({ error: 'Food Not Found' }));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error })
  });
});

module.exports = router;
