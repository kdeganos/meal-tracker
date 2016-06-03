import {Pipe, PipeTransform} from 'angular2/core';
import { Meal } from './meal.model';

@Pipe({
  name: "dateSelect",
  pure: false
})
export class DatePipe implements PipeTransform {
  transform(input: Meal[], args) {
    var desiredDate = args[0];
    if (desiredDate === "all") {
      return input;
    } else {
      return input.filter(function(meal) {
        return meal.date === desiredDate;
      });
    }
  }
}
