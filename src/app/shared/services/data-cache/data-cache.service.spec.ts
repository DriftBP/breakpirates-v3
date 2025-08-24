import { TestBed } from '@angular/core/testing';

import { DataCacheService } from './data-cache.service';

type TestType = {
  testString: string;
  testBoolean: boolean;
  testArray: any[];
};

describe('DataCacheService', () => {
  let service: DataCacheService<TestType>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCacheService]
    });

    service = TestBed.inject(DataCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store value', () => {
    const key = 'test';
    const value: TestType = {
      testString: 'test',
      testBoolean: true,
      testArray: []
    }

    service.put(key, value);

    expect(service.get(key)).toEqual(value);
  });
});
