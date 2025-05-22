import { NgOptimizedImage } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { NavigationService } from '../services/navigation/navigation.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';

interface ExternalLink {
  Url: string;
  Text: string;
}

@Component({
  selector: 'bp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    NgOptimizedImage,
    RouterModule,
    FontAwesomeModule,
    CollapseModule,
    TranslatePipe
  ]
})
export class NavigationComponent {
  archiveUrl: string;
  isCollapsed: Signal<boolean>;
  assetRoot = AppSettings.ASSET_ROOT;
  externalLinks: ExternalLink[] = [
    {
      Url: 'https://mytuner-radio.com/radio/break-pirates-450101/',
      Text: 'myTuner Radio'
    },
    {
      Url: 'https://onlineradiobox.com/uk/breakpirates/',
      Text: 'Online Radio Box'
    },
    {
      Url: 'https://internetradiouk.com/break-pirates/',
      Text: 'Internet Radio UK'
    },
    {
      Url: 'https://www.radio-uk.co.uk/break-pirates',
      Text: 'Radio UK'
    },
    {
      Url: 'https://uk.radio.net/s/breakpirates',
      Text: 'Radio.net'
    },
    {
      Url: 'https://streema.com/radios/Break_Pirates',
      Text: 'Streema'
    },
    {
      Url: 'https://radio-live-uk.com/break-pirates',
      Text: 'Radio Live UK'
    }
  ];

  faExternalLink = faExternalLink;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.archiveUrl = AppSettings.MIXCLOUD_URL;
    this.isCollapsed = computed(() => this.navigationService.isCollapsed());
  }

  toggleIsCollapsed() {
    this.navigationService.setCollapsed(!this.isCollapsed());
  }

  onTuneInClick(option: string) {
    this.googleAnalyticsService.trackEvent('click', 'Tune in link', option);
  }
}
