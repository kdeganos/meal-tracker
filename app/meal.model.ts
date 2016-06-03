export class Meal {
  totalDayCalories: number = 0;
  averageDayCalories: number = 0;
  constructor(public name: string, public details: string, public calories: number, public date: string) {

  }
}
