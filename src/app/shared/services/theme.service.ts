import { Injectable } from '@angular/core';

import { Theme } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private localStorageKey = 'theme';
  private theme: Theme;

  constructor() {
    const themeName = localStorage.getItem(this.localStorageKey);

    if (themeName) {
      const theme = Theme[this.getEnumKeyByEnumValue(Theme, themeName)];
      this.setTheme(theme ?? Theme.Default);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme(Theme.Dark);
    } else {
      this.setTheme(Theme.Default);
    }
  }

  private getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    localStorage.setItem(this.localStorageKey, theme);
  }

  getTheme(): Theme {
    return this.theme;
  }
}
