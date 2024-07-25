import { Pipe, PipeTransform } from '@angular/core';

import { DateTime } from 'luxon';

@Pipe({
    name: 'formattedDate',
    standalone: true
})
export class FormattedDatePipe implements PipeTransform {

  public transform(value: string): string {
    return DateTime.fromSeconds(parseInt(value)).toLocaleString(DateTime.DATE_HUGE);
  }
}
