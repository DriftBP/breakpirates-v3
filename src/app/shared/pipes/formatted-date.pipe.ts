import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
    name: 'formattedDate'
})
export class FormattedDatePipe implements PipeTransform {

  public transform(value: number): string {
    return moment.unix(value).format('dddd, MMMM Do YYYY');
  }
}
