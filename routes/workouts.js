
const models = require('../models');
const Workout = models.Workout;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Workout.findAll().then((workouts) => {
    
  });
});

module.exports = router;
