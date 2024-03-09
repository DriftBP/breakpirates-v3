import { Injectable } from '@angular/core';

@Injectable()
export class MockDayService {
  dayName(dayId: number): string {
    return '';
  }
}
