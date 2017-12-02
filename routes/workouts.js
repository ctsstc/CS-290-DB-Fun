
const models = require('../models');
const Workout = models.Workout;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Workout.findAll({raw: true}).then((workouts) => {
    workouts = workouts.map(workout => {
      // remove timestamp
      workout.date = workout.date.slice(0, 10);
      return workout;
    });
    res.render('workouts', {workouts});
  });
});

router.post('/', (req, res) => {
  Workout.create(req.body).then(() => {
    res.sendStatus(200);
  });
});

router.put('/', (req, res) => {
  let id = req.body.id;
  console.log("ID", id, "BODY", req.body);
  Workout.findById(id).then((workout) => {
    return workout.update(req.body);
  }).then(() => {
    res.sendStatus(200);
  });
});

router.delete('/', (req, res) => {
  let id = req.body.id;
  Workout.findById(id).then((workout) => {
    return workout.destroy();
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
