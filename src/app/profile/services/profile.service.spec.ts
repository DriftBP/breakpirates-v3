import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { Host } from '../host';

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

  it('should get previous position', inject([ProfileService], (service: ProfileService) => {
    const numItems = 5;

    expect(service['previousProfileIndex'](0, numItems)).toEqual(4);
    expect(service['previousProfileIndex'](1, numItems)).toEqual(0);
    expect(service['previousProfileIndex'](2, numItems)).toEqual(1);
    expect(service['previousProfileIndex'](3, numItems)).toEqual(2);
    expect(service['previousProfileIndex'](4, numItems)).toEqual(3);
  }));

  it('should get next position', inject([ProfileService], (service: ProfileService) => {
    const numItems = 5;

    expect(service['nextProfileIndex'](0, numItems)).toEqual(1);
    expect(service['nextProfileIndex'](1, numItems)).toEqual(2);
    expect(service['nextProfileIndex'](2, numItems)).toEqual(3);
    expect(service['nextProfileIndex'](3, numItems)).toEqual(4);
    expect(service['nextProfileIndex'](4, numItems)).toEqual(0);
  }));

  it('should get correct position from items sorted by ID', inject([ProfileService], (service: ProfileService) => {
    const hosts: Host[] = [
      host1,
      host2,
      host3,
      host4,
      host5
    ];

    expect(service['getProfilePosition'](hosts, 1)).toEqual(0);
    expect(service['getProfilePosition'](hosts, 2)).toEqual(1);
    expect(service['getProfilePosition'](hosts, 3)).toEqual(2);
    expect(service['getProfilePosition'](hosts, 4)).toEqual(3);
    expect(service['getProfilePosition'](hosts, 5)).toEqual(4);
  }));

  it('should return -1 if id of a is less than b, otherwise 1', inject([ProfileService], (service: ProfileService) => {
    expect(service['profileCompareFn'](host1, host2)).toEqual(1);
    expect(service['profileCompareFn'](host2, host3)).toEqual(-1);
    expect(service['profileCompareFn'](host3, host4)).toEqual(-1);
    expect(service['profileCompareFn'](host4, host5)).toEqual(1);
    expect(service['profileCompareFn'](host5, host1)).toEqual(-1);
  }));
});
