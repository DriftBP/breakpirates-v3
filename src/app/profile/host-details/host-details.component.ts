import { AsyncPipe } from '@angular/common';
import { Component, input, effect } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Host } from '../host';
import { ProfileService } from '../services/profile.service';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { profilesConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { HostNavigationComponent } from '../host-navigation/host-navigation.component';
import { TwitterWidgetComponent } from '../twitter-widget/twitter-widget.component';
import { MixcloudWidgetComponent } from '../mixcloud-widget/mixcloud-widget.component';
import { ShowSummaryComponent } from '../../schedule/show-summary/show-summary.component';
import { HostListComponent } from '../../schedule/host-list/host-list.component';
import { GenreListComponent } from '../../schedule/genre-list/genre-list.component';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'bp-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss'],
  imports: [
    AsyncPipe,
    SafePipe,
    TranslateModule,
    HostNavigationComponent,
    TwitterWidgetComponent,
    MixcloudWidgetComponent,
    ShowSummaryComponent,
    HostListComponent,
    GenreListComponent,
    ReadMoreComponent
  ],
  standalone: true
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

  hasValue(value: string | null): boolean {
    return value !== null && value !== '';
  }

}
