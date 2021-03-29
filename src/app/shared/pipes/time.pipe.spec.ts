import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let pipe: TimePipe;

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
