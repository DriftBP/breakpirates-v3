import { Pipe, PipeTransform } from '@angular/core';

import { DateTime } from 'luxon';

@Pipe({
    name: 'formattedDate'
})
export class FormattedDatePipe implements PipeTransform {

  public transform(value: number): string {
    return DateTime.utc(value).toFormat('dddd, MMMM Do YYYY');
  }
}
