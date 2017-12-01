'use strict';
module.exports = (sequelize, DataTypes) => {
  var Workout = sequelize.define('Workout', {
    name: DataTypes.STRING,
    reps: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    date: DataTypes.DATE,
    unit: DataTypes.ENUM('lbs', 'kg`')
  });

  return Workout;
};