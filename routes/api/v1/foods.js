
var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

/* GET all foods */
router.get("/", function (req, res) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

router.delete('/:id', function(req, res) {
  Food.findOne({ where: { id: req.params.id }})
  .then(food => {
    food.destroy();
    res.setHeader('Content-Type', 'application/json');
    res.status(204).send()
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: "Not Found" });
  });
});

module.exports = router;
