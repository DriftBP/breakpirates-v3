import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FollowedProfilesService {
  private readonly storageKey = 'bp_followed_profiles';
  private readonly followedIdsState = signal(this.loadFollowedIds());
  readonly followedIds = this.followedIdsState.asReadonly();

  isFollowing(profileId: number): boolean {
    return this.followedIdsState().includes(profileId);
  }

  toggle(profileId: number): void {
    const followedIds = this.followedIdsState();
    const nextIds = followedIds.includes(profileId)
      ? followedIds.filter(id => id !== profileId)
      : [...followedIds, profileId];

    this.followedIdsState.set(nextIds);
    localStorage.setItem(this.storageKey, JSON.stringify(nextIds));
  }

  private loadFollowedIds(): number[] {
    try {
      const savedIds: unknown = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
      return Array.isArray(savedIds)
        ? [...new Set(savedIds.filter((id): id is number => Number.isInteger(id) && id > 0))]
        : [];
    } catch {
      return [];
    }
  }
}
