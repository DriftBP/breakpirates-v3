import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Host } from '../host';
import { Show } from '../../schedule/show';
import { ProfileService } from '../profile.service';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private showsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive
  ];

  profile: Host;
  shows: Show[];
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.initialiseState();
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

    if (this.showsSubscription) {
      this.showsSubscription.unsubscribe();
    }
  }

  initialiseState(): void {
    this.profile = this.route.snapshot.data['profile'];

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.profile.name,
      isActive: true
    });

    this.showsSubscription = this.profileService.profileShows(this.profile.id)
      .subscribe(shows => this.shows = shows);
  }

  hasMixcloud(): boolean {
    return this.profile?.mixcloud !== null;
  }

  hasTwitter(): boolean {
    return this.profile.twitter !== null;
  }

}
