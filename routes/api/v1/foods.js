var express = require('express');
var router = express.Router();
var Food = require('../../../models').Food;

/*POST new food*/
router.post("/", function(req, res) {
  Food.create({
          name: req.body.food.name,
          calories: req.body.food.calories
    })
    .then(food => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(food));
    })
    .catch(error => {
			console.log(req.body)
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* GET all foods */
router.get('/', function (req, res) {
  Food.findAll()
    .then(foods => {
      if (!foods.length) {
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

///* Update a single food resource */
//router.put('/:id', function (req, res) {
//  Food.findOne({ where: { id: req.params.id }})
//  .then(food => {
//		if (!food) {
//      res.setHeader('Content-Type', 'application/json');
//      res.status(400).send(JSON.stringify({ error: 'Need Food Name And Calories' }));
//		}
//    if (!req.body.food.name && !req.body.food.calories) {
//      res.setHeader('Content-Type', 'application/json');
//      res.status(400).send(JSON.stringify({ error: 'Need Food Name And Calories' }));
//    }  else if (!req.body.food.name && req.body.food.calories) {
//      res.setHeader('Content-Type', 'application/json');
//      res.status(400).send(JSON.stringify({ error: 'Need Food Name' }));
//    } else if (!req.body.food.calories && req.body.food.name) {
//      res.setHeader('Content-Type', 'application/json');
//      res.status(400).send(JSON.stringify({ error: 'Need Food Calories' }));
//    } else if (!food) {
//      res.setHeader('Content-Type', 'application/json');
//      res.status(404).send(JSON.stringify({ error: 'Food Not Found' }));
//		}
//    else {
//      Food.update(
//        {
//          name: req.body.food.name,
//          calories: req.body.food.calories
//        },
//        {
//          returning: true,
//          where: {
//            id: parseInt(req.params.id)
//          }
//        }
//      )
//      .then(([rowsUpdate, [updatedFood]]) => {
//        res.setHeader('Content-Type', 'application/json');
//        res.status(202).send(JSON.stringify(updatedFood));
//      })
//      .catch(error => {
//        res.setHeader('Content-Type', 'application/json');
//        res.status(406).send({ error: 'Unable To Update' })
//      });
//    }
//  })
//  .catch(error => {
//    res.setHeader('Content-Type', 'application/json');
//    res.status(500).send({ error })
//  });
//});

router.put('/:id', function (req, res) {
  Food.findOne({ where: { id: req.params.id }})
  .then(food => {
		if (food) {
      Food.update(
        {
          name: req.body.food.name,
          calories: req.body.food.calories
        },
        {
          returning: true,
          where: {
            id: parseInt(req.params.id)
          }
        }
      )
      .then(([rowsUpdate, [updatedFood]]) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(202).send(JSON.stringify(updatedFood));
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json');
        res.status(406).send({ error: 'Unable To Update' })
      });
		}
	})
	.catch(error => {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ error: 'Need Food Name And Calories' }));
	});
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
    res.status(404).send({ error: "Not Found" });
  });
});

module.exports = router;
