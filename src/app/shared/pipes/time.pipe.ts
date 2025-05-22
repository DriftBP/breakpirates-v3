import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

  public transform(value: string): string {
    if (value) {
      const timeParts = value.split(':');

      if (timeParts.length > 1) {
        return DateTime.local()
          .set({
            hour: parseInt(timeParts[0], 10),
            minute: parseInt(timeParts[1], 10)
          })
          .toFormat('HH:mm');
      }
    }

    return '';
  }
}
