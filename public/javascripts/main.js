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
    this.bindEditSave();
    this.bindWorkoutsDelete();
  }

  bindEditSave() {
    let workout = this;
    this.editSave.click(function(e) {
      e.preventDefault();
      workout.save();
    });
  }

  bindWorkoutsDelete() {
    let workout = this;
    $('.delete', this.workouts).click(function() {
      workout.delete(this);
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
    });
  }

  delete(el) {
    let workout = $(el);
    let id = workout.data('id');

    $.ajax({
      method: 'delete',
      contentType: 'application/json',
      data: JSON.stringify({id}),
      success: () => {
        this.deleteWorkout(id);
      }
    });
  }

  deleteWorkout(id) {
    $(`#workout-${id}`).remove();
  }


}