import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedDate'
})
export class MockFormattedDatePipe implements PipeTransform {
  transform(value: number): number {
    //Do stuff here, if you want
    return value;
  }
}
