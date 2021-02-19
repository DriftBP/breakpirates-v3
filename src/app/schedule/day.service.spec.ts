import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DayService } from './day.service';

describe('DayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([DayService], (service: DayService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 7 days', inject([DayService], (service: DayService) => {
    expect(service.days().length).toEqual(7);
  }));

  it('should return day name', inject([DayService], (service: DayService) => {
    expect(service.dayName(1)).toEqual('Monday');
    expect(service.dayName(2)).toEqual('Tuesday');
    expect(service.dayName(3)).toEqual('Wednesday');
    expect(service.dayName(4)).toEqual('Thursday');
    expect(service.dayName(5)).toEqual('Friday');
    expect(service.dayName(6)).toEqual('Saturday');
    expect(service.dayName(7)).toEqual('Sunday');
  }));
});
