import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Host } from '../host';
import { ProfileService } from '../services/profile.service';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit, OnDestroy {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  private routeDataSubscription: Subscription;

  profile: Host;
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public readonly profileService: ProfileService,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ profile }) => {
      this.profile = profile;

      this.setBreadcrumb();
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.profile?.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  hasValue(value: string): boolean {
    return value !== null && value !== '';
  }

}
