import { Component } from '@angular/core';

import { Site } from '../services/social/site';
import { SocialService } from '../services/social/social.service';
import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent {
  socialSites: Site[];
  assetRoot = AppSettings.ASSET_ROOT;

  constructor(
    private readonly socialService: SocialService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.socialSites = this.socialService.getSocialSites();
  }

  onSocialClick(site: Site) {
    this.googleAnalyticsService.trackEvent('click', 'Footer bar social link', site.Name);
  }
}
