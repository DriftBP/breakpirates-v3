import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

// https://forum.ionicframework.com/t/inserting-html-via-angular-2-use-of-domsanitizationservice-bypasssecuritytrusthtml/62562/2
@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

  public transform(value: string): string {
    const timeParts = value.split(':');

    if (timeParts.length > 1) {
      return moment()
        .hours(parseInt(timeParts[0], 10))
        .minutes(parseInt(timeParts[1], 10))
        .format('h:mm a');
    } else {
      return '';
    }
  }
}
