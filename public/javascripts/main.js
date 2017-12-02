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
    this.editInputs = $('input', this.editWorkout);

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
    this.bindEditWorkout();
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

  bindEditWorkout() {
    let workout = this;
    $('.edit', this.workouts).click(function() {
      workout.editWorkoutUI(this);
    });
  }

  serialize(el) {
    return {
      id: $('.edit', el).data('id'),
      date: $('.date', el).text(),
      reps: $('.reps', el).text(),
      name: $('.name', el).text(),
      weight: $('.weight', el).text(),
      unit: $('.unit', el).text()
    }
  }

  deserialize(workoutData) {
    this.editId.val(workoutData.id);
    this.editDate.val(workoutData.date.slice(0,10));
    this.editReps.val(workoutData.reps);
    this.editName.val(workoutData.name);
    this.editWeight.val(workoutData.weight);
    this.editUnit.val(workoutData.unit);
  }

  save() {
    let datas = this.serialize(this.editWorkout);
    let method = datas.id == 'new' ? 'POST' : 'PUT';

    if (datas.id == 'new') {
      delete datas.id;
    }

    $.ajax({
      method,
      contentType: 'application/json', 
      data: JSON.stringify(datas),
      success: () => {
        if (datas.id == undefined) {
          this.addWorkout(datas);
        }
      }
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

  addWorkout(workout) {
    let workoutUI = $(`<tr id="workout-${workout.id}" class="workout">
      <td class="date">${workout.date}</td>
      <td class="reps">${workout.reps}</td>
      <td class="name">${workout.name}</td>
      <td class="weight">${workout.weight}</td>
      <td class="unit">${workout.unit}</td>
      <td>
        <button type="button" class="edit btn btn-success" data-id="${workout.id}" data-action="edit">
          <img src="/images/svg/ic_edit_black_24px.svg">
        </button>
      </td>
      <td>
        <button type="button" class="delete btn btn-danger" data-id="${workout.id}" data-action="delete">
          <img src="/images/svg/ic_delete_forever_black_24px.svg">
        </button>
      </td>
    </tr>`);

    workout = this;
    $('.edit', workoutUI).click(function() {
      workout.editWorkoutUI(this);
    });

    $('.delete', workoutUI).click(function() {
      workout.deleteWorkout($(this).data('id'));
    });

    this.workouts.parent().append(workoutUI);

    this.resetUI();
  }

  getWorkout(id) {
    return $(`#workout-${id}`);
  }

  editWorkoutUI(el) {
    let id = $(el).data('id');
    let workout = this.getWorkout(id);
    // Update our Form
    this.populateEditUI(id);
  }

  populateEditUI(id) {
    this.editAction.text('Edit Workout');
    let workout = this.getWorkout(id);
    let data = this.serialize(workout);
    this.deserialize(data);
    window.scrollTo(0, 0);
  }

  resetUI() {
    this.editAction.text('New Workout');
    // reset all inputs
    this.editInputs.val('');
    this.editUnit.val('lbs'); // dirty hard code for now, could find the first and set it to that
  }

  deleteWorkout(id) {
    this.getWorkout(id).remove();
  }

}