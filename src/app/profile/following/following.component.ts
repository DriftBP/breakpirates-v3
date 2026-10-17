import { Component, OnInit, computed, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { Host } from '../host';
import { Show } from '../../schedule/models/show';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { FollowedProfilesService } from '../services/followed-profiles.service';
import { ProfileButtonComponent } from '../profile-button/profile-button.component';
import { ShowSummaryComponent } from '../../schedule/show-summary/show-summary.component';

@Component({
  selector: 'bp-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
  imports: [
    RouterLink,
    TranslatePipe,
    ProfileButtonComponent,
    ShowSummaryComponent
  ]
})
export default class FollowingComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly followedProfilesService = inject(FollowedProfilesService);

  profiles = input<Host[]>([]);
  shows = input<Show[]>([]);

  followedProfiles = computed(() => {
    const followedIds = new Set(this.followedProfilesService.followedIds());
    return this.profiles().filter(profile => followedIds.has(profile.id));
  });

  followedShows = computed(() => {
    const followedIds = new Set(this.followedProfiles().map(profile => profile.id));
    return this.shows().filter(show => show.hosts.some(host => followedIds.has(host.id)));
  });

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive,
    { name: 'PROFILES.FOLLOWING_TITLE', isActive: true }
  ];

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
