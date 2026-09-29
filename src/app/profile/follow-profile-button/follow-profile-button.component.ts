import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Host } from '../host';
import { FollowedProfilesService } from '../services/followed-profiles.service';

@Component({
  selector: 'bp-follow-profile-button',
  templateUrl: './follow-profile-button.component.html',
  styleUrls: ['./follow-profile-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe]
})
export class FollowProfileButtonComponent {
  private readonly followedProfiles = inject(FollowedProfilesService);

  profile = input.required<Host>();
  isFollowing = computed(() => this.followedProfiles.followedIds().includes(this.profile().id));

  toggleFollow(): void {
    this.followedProfiles.toggle(this.profile().id);
  }
}
