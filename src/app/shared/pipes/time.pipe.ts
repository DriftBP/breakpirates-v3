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
        // Parse as UK time, then convert to local time
        const ukTime = DateTime.fromObject(
          {
            hour: parseInt(timeParts[0], 10),
            minute: parseInt(timeParts[1], 10)
          },
          { zone: 'Europe/London' }
        );
        // Convert to local time zone and format
        return ukTime.setZone(DateTime.local().zoneName).toFormat('HH:mm');
      }
    }
    return '';
  }
}
