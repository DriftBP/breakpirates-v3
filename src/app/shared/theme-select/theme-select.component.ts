import { Component } from '@angular/core';

import { ThemeService } from '../services/theme/theme.service';
import { ThemeSetting } from '../services/theme/theme-setting';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

interface IThemeOption {
  setting: ThemeSetting;
  key: string;
}

@Component({
  selector: 'bp-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss']
})
export class ThemeSelectComponent {
  options: IThemeOption[] = [
    {
      setting: ThemeSetting.Auto,
      key: 'FOOTER.AUTO'
    },
    {
      setting: ThemeSetting.Light,
      key: 'FOOTER.LIGHT'
    },
    {
      setting: ThemeSetting.Dark,
      key: 'FOOTER.DARK'
    },
  ];

  constructor(
    private readonly themeService: ThemeService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {}

  setThemeSetting(themeSetting: ThemeSetting) {
    this.themeService.setThemeSetting(themeSetting);
    this.googleAnalyticsService.trackEvent('click', 'Theme selection', themeSetting.toString());
  }

}
