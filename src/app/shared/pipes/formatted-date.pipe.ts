import { Pipe, PipeTransform } from '@angular/core';

import { DateTime } from 'luxon';

@Pipe({
    name: 'formattedDate'
})
export class FormattedDatePipe implements PipeTransform {

  public transform(value: string): string {
    return DateTime.fromSeconds(parseInt(value)).toFormat('dddd, MMMM Do YYYY');
  }
}
