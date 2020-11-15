import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {

  public transform(value: number): string {
    return DateTime.utc(value).toISO();
  }
}
