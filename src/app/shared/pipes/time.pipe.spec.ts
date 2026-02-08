import { TimePipe } from './time.pipe';
import { AppSettings } from '../../app-settings';
import { DateTime } from 'luxon';

describe('TimePipe', () => {
  let pipe: TimePipe;
  let originalShowTimezone: string;
  let originalDateTimeLocal: typeof DateTime.local;

  beforeAll(() => {
    // Save and mock the timezone config
    originalShowTimezone = AppSettings.SHOW_TIMEZONE;
    AppSettings.SHOW_TIMEZONE = 'Europe/London';
    // Patch DateTime.local to always return Europe/London
    originalDateTimeLocal = DateTime.local;
    DateTime.local = function (...args: any[]): DateTime {
      // Use type assertion to bypass TS error
      const dt = (originalDateTimeLocal as any).apply(DateTime, args);
      return dt.setZone('Europe/London');
    };
  });

  afterAll(() => {
    AppSettings.SHOW_TIMEZONE = originalShowTimezone;
    DateTime.local = originalDateTimeLocal;
  });

  beforeEach(() => {
    pipe = new TimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display time in HH:mm format', () => {
    const time = pipe.transform('1:00');
    expect(time).toEqual('01:00');
  });

  it('should display midnight correctly', () => {
    const time = pipe.transform('24:00');
    expect(time).toEqual('00:00');
  });

});
