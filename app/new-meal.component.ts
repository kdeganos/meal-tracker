import { Component, EventEmitter } from 'angular2/core';
import { Meal } from './meal.model';

@Component({
  selector: 'new-meal',
  outputs: ['onSubmitNewMeal'],
  template:`
    <div class="meal-form">
      <h3>Add a Meal</h3>
      <label class="col-sm-6" for="newName">Name</label><input class="col-sm-6 input-lg cd-form" #newName>
      <label class="col-sm-6" for="newDetails">Details</label><input class="col-sm-6 input-lg cd-form" #newDetails>
      <label class="col-sm-6" for="newCalories">Calories</label><input class="col-sm-6 input-lg cd-form" type="number" #newCalories>
      <button (click)="addMeal(newName, newDetails, newCalories)" class="col-sm-6 btn-success btn-lg add-button addMeal">Add</button>
    </div>
  `
})
export class NewMealComponent {
  public onSubmitNewMeal: EventEmitter<Meal>;
  constructor() {
    this.onSubmitNewMeal = new EventEmitter();
  }
  addMeal(newName: HTMLInputElement, newDetails: HTMLInputElement, newCalories: HTMLInputElement) {
    if(newName.value.trim() === "") {
        alert("Please give the meal a name.");
    } else {
      var meal = new Meal(newName.value, newDetails.value, Number(newCalories.value));
      this.onSubmitNewMeal.emit(meal);
    }
  }
}
