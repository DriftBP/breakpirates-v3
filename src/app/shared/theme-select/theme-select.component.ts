import { Component } from '@angular/core';

import { ThemeService } from '../services/theme/theme.service';
import { ThemeSetting } from '../services/theme/theme-setting';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss']
})
export class ThemeSelectComponent {
  themeSettings = ThemeSetting;

  constructor(
    private readonly themeService: ThemeService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {}

  setThemeSetting(themeSetting: ThemeSetting) {
    this.themeService.setThemeSetting(themeSetting);
    this.googleAnalyticsService.trackEvent('click', 'Theme selection', themeSetting.toString());
  }

}
