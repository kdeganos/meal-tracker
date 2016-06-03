import { Component } from 'angular2/core';
import { MealListComponent } from './meal-list.component';
import { Meal } from './meal.model';

@Component({
  selector: 'meal-tracker',
  directives: [MealListComponent],
  template: `
    <div class="container">
      <h1 class="jumbotron header">Meal Tracker</h1>
        <h2>Meals</h2>
        <meal-list
          [mealList]="meals">
        </meal-list>
    </div>
  `
})
export class AppComponent {
  public meals: Meal[];
  constructor() {
    this.meals = [
      new Meal("Hamburger", "Didn't get a soda or cheese on my burger!", 354),
      new Meal("Fries", "I only ate half of them.", 365),
      new Meal("Pizza", "I ate an entire medium pizza.", 2500)
    ];
  }
}
