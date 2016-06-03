import { Component, EventEmitter } from 'angular2/core';
import { MealComponent } from './meal.component';
import { NewMealComponent } from './new-meal.component';
import { Meal } from './meal.model';
import { EditMealDetailsComponent } from './edit-meal-details.component';
import { CaloriePipe } from './calorie.pipe';

@Component({
  selector: 'meal-list',
  inputs: ['mealList'],
  pipes: [CaloriePipe],
  directives: [MealComponent, NewMealComponent, EditMealDetailsComponent],
  template:`
    <label>Filter by Calories</label>
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">All Meals</option>
      <option value="healthy">Less Than 500 Calories</option>
      <option value="unhealthy">More Than 500 Calories</option>
    </select>
    <div *ngFor="#currentMeal of mealList | calorieSelect:filterCalorie; #i=index">
      <div *ngIf="i-1 < 0">
        <hr>
        <h2 class="dateHead">{{ currentMeal.date }}</h2>
      </div>
      <div *ngIf="i-1 >= 0">
        <hr *ngIf="currentMeal.date != mealList[i-1].date">
        <h2 *ngIf="currentMeal.date != mealList[i-1].date" class="dateHead">{{ currentMeal.date }}</h2>
      </div>
      <meal-display
        (click)="mealClicked(currentMeal)"
        [class.selected]="currentMeal === selectedMeal"
        [meal]="currentMeal" [mealList]="mealList">
      </meal-display>
    </div>
    <hr>
    <div class="addedit">
      <div class="col-md-6 addMeal">
        <new-meal (onSubmitNewMeal)="createMeal($event)">
        </new-meal>
      </div>
      <div class="col-md-6 editMeal">
      <div *ngIf="selectedMeal && editorOpen">
        <edit-meal-details [meal]="selectedMeal">
        </edit-meal-details>
        <button (click)="hideEditor()" class="btn btn-success">Done</button>
        </div>
      </div>
    </div>
  `
})
export class MealListComponent {
  public mealList: Meal[];
  public onMealSelect: EventEmitter<Meal>;
  public selectedMeal: Meal;
  public filterCalorie: string = "all";
  public editorOpen: boolean = true;

  constructor() {
    this.onMealSelect = new EventEmitter();
  }
  createMeal(meal: Meal): void {
    this.mealList.push(meal);
    this.sortMeals();
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;
    this.onMealSelect.emit(clickedMeal);
  }
  onChange(filterOption): void {
    this.filterCalorie = filterOption;
  }
  hideEditor(): void {
    this.editorOpen = false;
    this.sortMeals();
  }
  sortMeals(): void {
    this.mealList.sort(function (a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
  }

  // public ngOnInit(): any {
  //   console.log(this.mealList);
  //   this.dateHeader = this.mealList[0].date;
  // }
}
