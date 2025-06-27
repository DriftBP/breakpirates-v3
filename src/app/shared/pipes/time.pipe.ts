import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { AppSettings } from '../../app-settings';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

  public transform(value: string): string {
    if (value) {
      const timeParts = value.split(':');
      if (timeParts.length > 1) {
        // Parse as configured show timezone, then convert to local time
        const sourceTime = DateTime.fromObject(
          {
            hour: parseInt(timeParts[0], 10),
            minute: parseInt(timeParts[1], 10)
          },
          { zone: AppSettings.SHOW_TIMEZONE }
        );
        // Convert to local time zone and format
        return sourceTime.setZone(DateTime.local().zoneName).toFormat('HH:mm');
      }
    }
    return '';
  }
}
