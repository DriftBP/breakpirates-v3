import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable()
export class MockShowService {
  getDates(): { startDate: DateTime, endDate: DateTime } {
    const startDate = DateTime.now();
    const endDate = DateTime.now();

    return { startDate: startDate, endDate: endDate };
  }
}
