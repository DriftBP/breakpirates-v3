import { Shallow } from 'shallow-render';

import { DayService } from './day.service';
import { ScheduleModule } from '../schedule.module';

describe('DayService', () => {
  let shallow: Shallow<DayService>;

  beforeEach(() => {
    shallow = new Shallow(DayService, ScheduleModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });

  it('should return 7 days', () => {
    const {instance} = shallow.createService();
    expect(instance.days().length).toEqual(7);
  });

  it('should return day name', () => {
    const {instance} = shallow.createService();
    expect(instance.dayName(1)).toEqual('Monday');
    expect(instance.dayName(2)).toEqual('Tuesday');
    expect(instance.dayName(3)).toEqual('Wednesday');
    expect(instance.dayName(4)).toEqual('Thursday');
    expect(instance.dayName(5)).toEqual('Friday');
    expect(instance.dayName(6)).toEqual('Saturday');
    expect(instance.dayName(7)).toEqual('Sunday');
  });
});
