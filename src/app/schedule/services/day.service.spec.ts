import { TestBed } from '@angular/core/testing';

import { DayService } from './day.service';

describe('DayService', () => {
  let service: DayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayService]
    });

    service = TestBed.inject(DayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 7 days', () => {
    expect(service.days().length).toEqual(7);
  });

  it('should return day name', () => {
    expect(service.dayName(1)).toEqual('Monday');
    expect(service.dayName(2)).toEqual('Tuesday');
    expect(service.dayName(3)).toEqual('Wednesday');
    expect(service.dayName(4)).toEqual('Thursday');
    expect(service.dayName(5)).toEqual('Friday');
    expect(service.dayName(6)).toEqual('Saturday');
    expect(service.dayName(7)).toEqual('Sunday');
  });
});
