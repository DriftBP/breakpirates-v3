import { TestBed, inject } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ScheduleService } from './schedule.service';
import { ShowService } from './show.service';

class MockShowService {}

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleService,
        { provide: ShowService, useClass: MockShowService },
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
