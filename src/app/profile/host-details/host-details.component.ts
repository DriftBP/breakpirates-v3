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

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  profile: Host;
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;

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
      name: this.profile?.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  hasValue(value: string): boolean {
    return value !== null && value !== '';
  }

}
