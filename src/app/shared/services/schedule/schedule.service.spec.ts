import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DateTime } from 'luxon';

import { ScheduleService } from './schedule.service';
import { Show } from '../../../schedule/models/show';

const dateFormat = 'YYYY-MM-DD';
const testDate = DateTime.local();

const mockShow1: Show = {
  id: 1,
  title: 'title',
  start_time: '18:00',
  end_time: '20:00',
  day_id: testDate.weekday,
  description: 'descripion',
  genres: [],
  hosts: []
};

const mockShow2: Show = { ...mockShow1, end_time: '01:00' };

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));

  /*it('should generate start and end dates today', inject([ScheduleService], (service: ScheduleService) => {
    const {startDate, endDate} = service.getDates(mockShow1);

    expect(startDate.toISOString()).toEqual(testDate.format(dateFormat) + 'T17:00:00.000Z');
    expect(endDate.toISOString()).toEqual(testDate.format(dateFormat) + 'T19:00:00.000Z');
  }));

  it('should generate start date today and end date tomorrow', inject([ScheduleService], (service: ScheduleService) => {
    const {startDate, endDate} = service.getDates(mockShow2);

    expect(startDate.toISOString()).toEqual(testDate.format(dateFormat) + 'T17:00:00.000Z');
    expect(endDate.toISOString()).toEqual(testDate.add(1, 'days').format(dateFormat) + 'T00:00:00.000Z');
  }));*/
});
