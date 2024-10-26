import { Component } from '@angular/core';

import { Site } from '../../social/services/site';
import { SocialService } from '../../social/services/social.service';
import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'bp-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
  imports: [
    TranslateModule,
    FontAwesomeModule,
    NgOptimizedImage
  ],
  standalone: true
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
