import { Component } from '@angular/core';

import { ThemeService } from '../services/theme/theme.service';
import { ThemeSetting } from '../services/theme/theme-setting';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  themeSettings = ThemeSetting;
  currentYear: number;

  constructor(
    private readonly themeService: ThemeService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.currentYear = new Date().getFullYear();
  }

  setThemeSetting(themeSetting: ThemeSetting) {
    this.themeService.setThemeSetting(themeSetting);
    this.googleAnalyticsService.trackEvent('click', 'Theme selection', themeSetting.toString())
  }

}
