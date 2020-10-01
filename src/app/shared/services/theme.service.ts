import { Injectable } from '@angular/core';

import { Theme } from './theme';
import { ThemeSetting } from './theme-setting';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private defaultTheme = Theme.Light;
  private defaultThemeSetting = ThemeSetting.Auto;
  private localStorageKey = 'bp_theme_setting';
  private currentTheme: Theme;

  constructor() {
    const themeSettingName = localStorage.getItem(this.localStorageKey);
    let themeSetting = this.defaultThemeSetting;

    // Use saved option if available
    if (themeSettingName) {
      const savedThemeSetting = ThemeSetting[this.getEnumKeyByEnumValue(Theme, themeSettingName)];

      if (savedThemeSetting) {
        themeSetting = savedThemeSetting;
      }
    }

    this.setTheme(this.getThemeForSetting(themeSetting));

    // Remove old setting
    localStorage.removeItem('theme');
  }

  private getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  private saveThemeSetting(themeSetting: ThemeSetting) {
    localStorage.setItem(this.localStorageKey, themeSetting);
  }

  private setTheme(theme: Theme): void {
    this.currentTheme = theme;
  }

  private getThemeForSetting(themeSetting: ThemeSetting): Theme {
    if (themeSetting === ThemeSetting.Light) {
      return Theme.Light;
    } else if (themeSetting === ThemeSetting.Dark) {
      return Theme.Dark;
    } else if (themeSetting === ThemeSetting.Auto) {
      // Auto option gets setting from OS
      if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return Theme.Dark;
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          return Theme.Light;
        }
      }
    }

    return this.defaultTheme;
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  setAndSaveThemeSetting(themeSetting: ThemeSetting): void {
    this.setTheme(this.getThemeForSetting(themeSetting));
    this.saveThemeSetting(themeSetting);
  }
}
