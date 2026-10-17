import { TestBed } from '@angular/core/testing';

import { FollowedProfilesService } from './followed-profiles.service';

describe('FollowedProfilesService', () => {
  const storageKey = 'bp_followed_profiles';

  beforeEach(() => {
    localStorage.removeItem(storageKey);
    TestBed.configureTestingModule({});
  });

  it('toggles followed profiles and persists their IDs', () => {
    const service = TestBed.inject(FollowedProfilesService);

    service.toggle(12);
    expect(service.isFollowing(12)).toBe(true);
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '[]')).toEqual([12]);

    service.toggle(12);
    expect(service.isFollowing(12)).toBe(false);
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '[]')).toEqual([]);
  });

  it('loads valid unique profile IDs from storage', () => {
    localStorage.setItem(storageKey, '[12,12,0,"15"]');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    expect(TestBed.inject(FollowedProfilesService).followedIds()).toEqual([12]);
  });
});
