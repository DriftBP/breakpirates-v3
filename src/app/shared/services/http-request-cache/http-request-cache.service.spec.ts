import { Shallow } from 'shallow-render';

import { HttpRequestCacheService } from './http-request-cache.service';
import { SharedModule } from '../../shared.module';

describe('HttpRequestCacheService', () => {
  let shallow: Shallow<HttpRequestCacheService>;

  beforeEach(() => {
    shallow = new Shallow(HttpRequestCacheService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });

  it('should store value', () => {
    const {instance} = shallow.createService();

    const key = 'test';
    const value = {
      testString: 'test',
      testBoolean: true,
      testArray: []
    }

    instance.put(key, value);

    expect(instance.get(key)).toEqual(value);
  });
});
