import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { NavigationService } from '../services/navigation/navigation.service';

interface ExternalLink {
  Url: string;
  Text: string;
}

@Component({
  selector: 'bp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {

  private collapsedSubscription: Subscription;

  archiveUrl: string;
  isCollapsed: boolean = false;
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
    this.collapsedSubscription = this.navigationService.isCollapsed$.subscribe(isCollapsed => this.isCollapsed = isCollapsed);
  }

  ngOnDestroy() {
    if (this.collapsedSubscription) {
      this.collapsedSubscription.unsubscribe();
    }
  }

  toggleIsCollapsed() {
    this.navigationService.setCollapsed(!this.isCollapsed);
  }

  onTuneInClick(option: string) {
    this.googleAnalyticsService.trackEvent('click', 'Tune in link', option);
  }
}
