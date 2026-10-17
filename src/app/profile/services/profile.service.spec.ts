import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { Host } from '../host';
import { createContentNavigation } from '../../shared/content-navigation/content-navigation';

const mockHost = {
  id: 0,
  name: '',
  biog: null,
  image: null,
  location: null,
  mixcloud: null,
  twitter: null
}
const host1: Host = { ...mockHost, id: 4, name: 'Phil' };
const host2: Host = { ...mockHost, id: 1, name: 'Nick' };
const host3: Host = { ...mockHost, id: 3, name: 'Oliver' };
const host4: Host = { ...mockHost, id: 5, name: 'Jon' };
const host5: Host = { ...mockHost, id: 2, name: 'Dan' };

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('creates adjacent navigation links and wraps at the collection ends', () => {
    const hosts: Host[] = [host2, host5, host3, host1, host4];

    expect(createContentNavigation(hosts, 1, host => host.name)).toEqual({
      previous: { id: 5, label: 'Jon' },
      next: { id: 2, label: 'Dan' }
    });
  });

  it('should return -1 if id of a is less than b, otherwise 1', inject([ProfileService], (service: ProfileService) => {
    expect(service['profileCompareFn'](host1, host2)).toEqual(1);
    expect(service['profileCompareFn'](host2, host3)).toEqual(-1);
    expect(service['profileCompareFn'](host3, host4)).toEqual(-1);
    expect(service['profileCompareFn'](host4, host5)).toEqual(1);
    expect(service['profileCompareFn'](host5, host1)).toEqual(-1);
  }));
});
