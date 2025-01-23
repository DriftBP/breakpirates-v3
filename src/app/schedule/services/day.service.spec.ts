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

  it('should return day from ID', () => {
    const day1 = service.dayById(1);
    const day2 = service.dayById(2);
    const day3 = service.dayById(3);
    const day4 = service.dayById(4);
    const day5 = service.dayById(5);
    const day6 = service.dayById(6);
    const day7 = service.dayById(7);

    expect(day1.id).toEqual(1);
    expect(day1.name).toEqual('Monday');

    expect(day2.id).toEqual(2);
    expect(day2.name).toEqual('Tuesday');

    expect(day3.id).toEqual(3);
    expect(day3.name).toEqual('Wednesday');

    expect(day4.id).toEqual(4);
    expect(day4.name).toEqual('Thursday');

    expect(day5.id).toEqual(5);
    expect(day5.name).toEqual('Friday');

    expect(day6.id).toEqual(6);
    expect(day6.name).toEqual('Saturday');

    expect(day7.id).toEqual(7);
    expect(day7.name).toEqual('Sunday');
  });

  describe('dayById', () => {
    it('should return day from mixed case name', () => {
      const day1 = service.dayByName('Monday');
      const day2 = service.dayByName('Tuesday');
      const day3 = service.dayByName('Wednesday');
      const day4 = service.dayByName('Thursday');
      const day5 = service.dayByName('Friday');
      const day6 = service.dayByName('Saturday');
      const day7 = service.dayByName('Sunday');

      expect(day1.id).toEqual(1);
      expect(day1.name).toEqual('Monday');

      expect(day2.id).toEqual(2);
      expect(day2.name).toEqual('Tuesday');

      expect(day3.id).toEqual(3);
      expect(day3.name).toEqual('Wednesday');

      expect(day4.id).toEqual(4);
      expect(day4.name).toEqual('Thursday');

      expect(day5.id).toEqual(5);
      expect(day5.name).toEqual('Friday');

      expect(day6.id).toEqual(6);
      expect(day6.name).toEqual('Saturday');

      expect(day7.id).toEqual(7);
      expect(day7.name).toEqual('Sunday');
    });

    it('should return day from lower case name', () => {
      const day1 = service.dayByName('monday');
      const day2 = service.dayByName('tuesday');
      const day3 = service.dayByName('wednesday');
      const day4 = service.dayByName('thursday');
      const day5 = service.dayByName('friday');
      const day6 = service.dayByName('saturday');
      const day7 = service.dayByName('sunday');

      expect(day1.id).toEqual(1);
      expect(day1.name).toEqual('Monday');

      expect(day2.id).toEqual(2);
      expect(day2.name).toEqual('Tuesday');

      expect(day3.id).toEqual(3);
      expect(day3.name).toEqual('Wednesday');

      expect(day4.id).toEqual(4);
      expect(day4.name).toEqual('Thursday');

      expect(day5.id).toEqual(5);
      expect(day5.name).toEqual('Friday');

      expect(day6.id).toEqual(6);
      expect(day6.name).toEqual('Saturday');

      expect(day7.id).toEqual(7);
      expect(day7.name).toEqual('Sunday');
    });

    it('should return day from upper case name', () => {
      const day1 = service.dayByName('MONDAY');
      const day2 = service.dayByName('TUESDAY');
      const day3 = service.dayByName('WEDNESDAY');
      const day4 = service.dayByName('THURSDAY');
      const day5 = service.dayByName('FRIDAY');
      const day6 = service.dayByName('SATURDAY');
      const day7 = service.dayByName('SUNDAY');

      expect(day1.id).toEqual(1);
      expect(day1.name).toEqual('Monday');

      expect(day2.id).toEqual(2);
      expect(day2.name).toEqual('Tuesday');

      expect(day3.id).toEqual(3);
      expect(day3.name).toEqual('Wednesday');

      expect(day4.id).toEqual(4);
      expect(day4.name).toEqual('Thursday');

      expect(day5.id).toEqual(5);
      expect(day5.name).toEqual('Friday');

      expect(day6.id).toEqual(6);
      expect(day6.name).toEqual('Saturday');

      expect(day7.id).toEqual(7);
      expect(day7.name).toEqual('Sunday');
    });
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
