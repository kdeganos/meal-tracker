import { Component, EventEmitter } from 'angular2/core';
import { MealComponent } from './meal.component';
import { NewMealComponent } from './new-meal.component';
import { Meal } from './meal.model';
import { EditMealDetailsComponent } from './edit-meal-details.component';
import { CaloriePipe } from './calorie.pipe';
import { DatePipe } from './date.pipe';

@Component({
  selector: 'meal-list',
  inputs: ['mealList'],
  pipes: [CaloriePipe, DatePipe],
  directives: [MealComponent, NewMealComponent, EditMealDetailsComponent],
  template:`
    <h2>Average Daily Calorie Intake: {{ averageDailyCalories.toFixed(0) }}</h2>
    <label>Filter by Calories</label>
    <select (change)="onChangeCalorie($event.target.value)" class="filter">
      <option value="all">All Meals</option>
      <option value="healthy">Less Than 500 Calories</option>
      <option value="unhealthy">More Than 500 Calories</option>
    </select>
    <br>
    <label>Filter by Date</label>
    <select (change)="onChangeDate($event.target.value)" class="filter">
      <option value="all">All Dates</option>
      <option *ngFor="#date of dates" [value]="date">{{date}}</option>
    </select>
    <div *ngFor="#currentMeal of mealList | calorieSelect:filterCalorie | dateSelect:filterDate; #i=index">
      <div *ngIf="mealList.indexOf(currentMeal)-1 < 0">
        <hr>
        <h2 class="dateHead">{{ currentMeal.date }}</h2>
        <h4 class="averages">Day's Total Calories: {{ currentMeal.totalDayCalories.toFixed(0) }}, Day's Average Calories Per Meal: {{ currentMeal.averageDayCalories.toFixed(0) }}</h4>
      </div>
      <div *ngIf="mealList.indexOf(currentMeal)-1 >= 0">
        <hr *ngIf="currentMeal.date != mealList[mealList.indexOf(currentMeal)-1].date">
        <h2 *ngIf="currentMeal.date != mealList[mealList.indexOf(currentMeal)-1].date" class="dateHead">{{ currentMeal.date }}</h2>
        <h4 *ngIf="currentMeal.date != mealList[mealList.indexOf(currentMeal)-1].date" class="averages">Day's Total Calories: {{ currentMeal.totalDayCalories.toFixed(0) }}, Day's Average Calories Per Meal: {{ currentMeal.averageDayCalories.toFixed(0) }}</h4>
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
  public filterDate: string = "all";
  public editorOpen: boolean = true;
  public dates: string[] = [];
  public averageDailyCalories: number = 0;

  constructor() {
    this.onMealSelect = new EventEmitter();
  }
  createMeal(meal: Meal): void {
    this.getCalorieStats(meal);
    this.mealList.push(meal);
    this.sortMeals();
    this.getDates();
    this.getAverageDailyCalories()
  }
  mealClicked(clickedMeal: Meal): void {
    this.selectedMeal = clickedMeal;
    this.onMealSelect.emit(clickedMeal);
  }
  onChangeCalorie(filterOption): void {
    this.filterCalorie = filterOption;
  }
  onChangeDate(filterOption): void {
    this.filterDate = filterOption;
  }
  hideEditor(): void {
    this.editorOpen = false;
    this.sortMeals();
    this.getDates();
    this.getAverageDailyCalories();
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
  getCalorieStats(meal: Meal): void {
    var totalCalories: number = meal.calories;
    var totalMeals: number = 1;
    for(var i=0; i<this.mealList.length; i++) {
      if(meal.date === this.mealList[i].date) {
        totalCalories += this.mealList[i].calories;
        totalMeals++;
      }
    }

    meal.totalDayCalories = totalCalories;
    meal.averageDayCalories = totalCalories / totalMeals;
    for(var i=0; i<this.mealList.length; i++) {
      if(meal.date === this.mealList[i].date) {
        this.mealList[i].totalDayCalories = meal.totalDayCalories;
          this.mealList[i].averageDayCalories = meal.averageDayCalories;
      }
    }
  }
  getAverageDailyCalories(): void {
    var totalCalories: number = this.mealList[0].calories;
    var totalDays: number = 1;
    for(var i=1; i<this.mealList.length; i++) {
      totalCalories += this.mealList[i].calories;
      if(this.mealList[i].date != this.mealList[i-1].date) {
        totalDays++;
      }
    }
    this.averageDailyCalories = totalCalories / totalDays;
  }
  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  getDates(): void {
    for(var i=0; i<this.mealList.length; i++) {
      if(!this.isInArray(this.mealList[i].date, this.dates)) {
        this.dates.push(this.mealList[i].date)
      }
    }
  }
  public ngOnInit(): any {
    this.getDates();
  }
}
