import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
    name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {

  public transform(value: number): string {
    return moment.unix(value).format();
  }
}
