
const models = require('../models');
const Workout = models.Workout;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Workout.findAll().then((workouts) => {
    res.render('workouts', workouts);
  });
});

module.exports = router;
