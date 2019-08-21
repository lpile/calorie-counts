
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

router.delete('/:id', function(req, res, next) {
  Food.destroy({
    where: {
      id: req.params.id
    }
  })
	.then(food => {
     if (food !== 1)
	{throw new Error("Not Found")}
	})
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(204).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ error: "Not Found"});
  })
});

module.exports = router;
