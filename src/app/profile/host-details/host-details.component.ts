import { Component, input, effect } from '@angular/core';

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
export class HostDetailsComponent {
  profile = input<Host>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    profilesConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  imagePath = AppSettings.ASSET_PROFILE_IMAGE;

  constructor(
    public readonly profileService: ProfileService,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    effect(() => {
      const profile = this.profile();

      if (profile) {
        this.setBreadcrumb(profile);
      }
    });
  }

  setBreadcrumb(profile: Host): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: profile.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  hasValue(value: string): boolean {
    return value !== null && value !== '';
  }

}
