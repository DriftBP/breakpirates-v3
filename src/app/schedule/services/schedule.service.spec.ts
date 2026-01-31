import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { ShowService } from './show.service';

class MockShowService {}

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleService,
        {
          provide: ShowService,
          useClass: MockShowService
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
