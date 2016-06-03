import { Component, EventEmitter } from 'angular2/core';
import { Meal } from './meal.model';

@Component({
  selector: 'meal-display',
  inputs: ['meal'],
  template: `
    <h3>{{ meal.name }}</h3>
      <ul class="mealDetails">
        <p><strong>Details: </strong>{{ meal.details }}</p>
        <p [class.healthy]="meal.calories < 500" [class.unhealthy]="meal.calories >= 500"><strong>Calories: </strong>{{ meal.calories }}</p>
        <p><strong>Date: </strong>{{ meal.date }}</p>
      </ul>
  `
})
export class MealComponent {
  public meal: Meal;
}
