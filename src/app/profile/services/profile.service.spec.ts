import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileService } from './profile.service';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        HttpRequestService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
