import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

import { Show } from '../../app/schedule/models/show';

@Injectable()
export class MockShowService {
  getDates(show: Show): { startDate: DateTime, endDate: DateTime } {
    const startDate = DateTime.now();
    const endDate = DateTime.now();

    return { startDate: startDate, endDate: endDate };
  }
}
