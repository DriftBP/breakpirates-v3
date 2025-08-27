import { TimePipe } from './time.pipe';
import { AppSettings } from '../../app-settings';

describe('TimePipe', () => {
  let pipe: TimePipe;

  beforeEach(() => {
    pipe = new TimePipe();
    AppSettings.SHOW_TIMEZONE = 'Europe/London';
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display time in HH:mm format', () => {
    // Use explicit zone if needed in your pipe implementation
    const time = pipe.transform('1:00');
    expect(time).toEqual('01:00');
  });

  it('should display midnight correctly', () => {
    const time = pipe.transform('24:00');
    expect(time).toEqual('00:00');
  });
});
