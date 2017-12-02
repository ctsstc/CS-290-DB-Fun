var workouts;

$(() => {
  workouts = new Workouts();
});

class Workouts {

  constructor() {
    this.bindUI();
    this.events();
  }

  bindUI() {
    this.editWorkout = $('.edit-workout').first();
    this.editAction = $('.action', this.editWorkout);
    this.editDate = $('.date', this.editWorkout);
    this.editReps = $('.reps', this.editWorkout);
    this.editName = $('.name', this.editWorkout);
    this.editWeight = $('.weight', this.editWorkout);
    this.editUnit = $('.unit', this.editWorkout);
    this.editSave = $('.save', this.editWorkout)

    this.workouts = $('table .workout');
  }

  events() {
    this.editSave.click(function(e) {
      e.preventDefault();
    });
  }

}