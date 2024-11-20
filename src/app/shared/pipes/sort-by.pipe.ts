/*
 *ngFor="let c of oneDimArray | sortBy:SortOrder.Ascending"
 *ngFor="let c of arrayOfObjects | sortBy:SortOrder.Ascending:'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core';

import { SortOrder } from './sort-order';

@Pipe({
    name: 'sortBy',
    standalone: false
})
export class SortByPipe implements PipeTransform {

  public transform(value: any[], order = SortOrder.Ascending, column: string = ''): any[] {
    return value.sort(this.compareValues(column, order));
  }

  private compareValues(key: string, order = SortOrder.Ascending) {
    return function innerSort(a: any, b: any) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === SortOrder.Descending) ? (comparison * -1) : comparison
      );
    };
  }
}
