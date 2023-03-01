import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class MockTimePipe implements PipeTransform {
  transform(value: number): number {
    //Do stuff here, if you want
    return value;
  }
}
