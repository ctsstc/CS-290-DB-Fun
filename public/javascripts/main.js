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
    this.editId = $('.id', this.editWorkout);
    this.editDate = $('.date', this.editWorkout);
    this.editReps = $('.reps', this.editWorkout);
    this.editName = $('.name', this.editWorkout);
    this.editWeight = $('.weight', this.editWorkout);
    this.editUnit = $('.unit', this.editWorkout);
    this.editSave = $('.save', this.editWorkout)

    this.workouts = $('table .workout');
  }

  events() {
    let workout = this;
    this.editSave.click(function(e) {
      e.preventDefault();
      workout.save();
    });
  }

  workoutData(el) {
    return {
      id: $('.id', el).val(),
      date: $('.date', el).val(),
      reps: $('.reps', el).val(),
      name: $('.name', el).val(),
      weight: $('.weight', el).val(),
      unit: $('.unit', el).val()
    }
  }

  save() {
    let datas = this.workoutData(this.editWorkout);
    let method = datas.id == 'new' ? 'POST' : 'PUT';

    if (datas.id == 'new') {
      delete datas.id;
    }

    $.ajax({
      method,
      contentType: 'application/json', 
      data: JSON.stringify(datas)
    })
  }



}