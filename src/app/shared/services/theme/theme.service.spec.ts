import { computed } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { ThemeSetting } from './theme-setting';
import { Theme } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });

    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide light theme as default theme', () => {
    const theme: Theme = service.currentTheme();

    expect(theme).toBe(Theme.Light);
  });

  it('should use light theme as default theme setting', () => {
    expect(service['defaultThemeSetting']).toBe(ThemeSetting.Auto);
  });

  it('should return light theme with light setting', () => {
    expect(service['getThemeForSetting'](ThemeSetting.Light)).toBe(Theme.Light);
  });

  it('should emit theme after theme is set', () => {
    const theme = computed(() => {
      return service.currentTheme();
    });

    service.setThemeSetting(ThemeSetting.Light);

    expect(theme()).toBe(Theme.Light);

    service.setThemeSetting(ThemeSetting.Dark);

    expect(theme()).toBe(Theme.Dark);
  });

  it('should save selected theme setting to local storage', () => {
    const localStorageKey = service['localStorageKey'];

    service['saveThemeSetting'](ThemeSetting.Auto);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Auto);

    service['saveThemeSetting'](ThemeSetting.Light);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Light);

    service['saveThemeSetting'](ThemeSetting.Dark);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Dark);
  });
});
