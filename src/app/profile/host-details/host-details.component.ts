import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Host } from '../host';
import { ProfileService } from '../services/profile.service';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { HostNavigation, HostNavigationType } from '../host-navigation/host-navigation-type';

@Component({
  selector: 'bp-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  profile: Host;
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;
  hostLinks: HostNavigation<HostNavigationType, Host>;
  profileLinksLoaded = false;

  constructor(
    private readonly route: ActivatedRoute,
    public readonly profileService: ProfileService,
    private readonly breadcrumbService: BreadcrumbService
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
  }

  initialiseState(): void {
    this.profile = this.route.snapshot.data['profile'];

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.profile.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.profileService.getProfileLinks(this.profile.id).subscribe(links => {
      this.hostLinks = {
        [HostNavigationType.Previous]: links.previous,
        [HostNavigationType.Next]: links.next
      };

      this.profileLinksLoaded = true;
    });
  }

  hasMixcloud(): boolean {
    return this.profile?.mixcloud !== null;
  }

  hasTwitter(): boolean {
    return this.profile.twitter !== null;
  }

}
