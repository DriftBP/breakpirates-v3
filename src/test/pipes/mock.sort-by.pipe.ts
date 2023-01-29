import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class MockSortByPipe implements PipeTransform {
  transform(value: number): number {
    //Do stuff here, if you want
    return value;
  }
}
