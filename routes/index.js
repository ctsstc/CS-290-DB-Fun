const models = require('../models');
const Workout = models.Workout;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/workouts');
});

router.get('/reset', (req, res, next) => {
  // force: true will drop the table
  Workout.sync({force: true}).then(() => {
    res.redirect('/workouts');
  });
});

module.exports = router;
