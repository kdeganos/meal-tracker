import { Component } from 'angular2/core';
import { Meal } from './meal.model';

@Component({
  selector: 'edit-meal-details',
  inputs: ['meal'],
  template:`
  <h3>Edit Meal Details</h3>
  <div class="meal-form">
    <label class="col-sm-6" for="mealName">Name</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="meal.name">
    <label class="col-sm-6" for="mealDetails">Details</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="meal.details">
    <label class="col-sm-6" for="mealCalories">Calories</label><input class="col-sm-6 input-lg cd-form" type="number" [(ngModel)]="meal.calories">
  </div>
  `
})
export class EditMealDetailsComponent {
  public meal: Meal;
}
