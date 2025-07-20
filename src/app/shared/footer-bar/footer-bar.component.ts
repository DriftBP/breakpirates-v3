import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Site } from '../../social/services/site';
import { SocialService } from '../../social/services/social.service';
import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
    selector: 'bp-footer-bar',
    templateUrl: './footer-bar.component.html',
    styleUrls: ['./footer-bar.component.scss'],
    imports: [
      FontAwesomeModule,
      NgOptimizedImage,
      TranslatePipe
    ]
})
export class FooterBarComponent {
  private readonly socialService = inject(SocialService);
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);

  socialSites: Site[];
  assetRoot = AppSettings.ASSET_ROOT;

  constructor() {
    this.socialSites = this.socialService.getSocialSites();
  }

  onSocialClick(site: Site) {
    this.googleAnalyticsService.trackEvent('click', 'Footer bar social link', site.Name);
  }
}
