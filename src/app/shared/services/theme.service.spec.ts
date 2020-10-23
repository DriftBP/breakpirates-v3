import { Shallow } from 'shallow-render';

import { ThemeService } from './theme.service';
import { SharedModule } from '../shared.module';
import { ThemeSetting } from './theme-setting';
import { Theme } from './theme';

describe('ThemeService', () => {
  let shallow: Shallow<ThemeService>;

  beforeEach(() => {
    shallow = new Shallow(ThemeService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });

  it('should provide light theme as default theme', () => {
    const {instance} = shallow.createService();
    let theme: Theme;

    instance.currentTheme.subscribe(currentTheme => {
      theme = currentTheme;
    });

    expect(theme).toBe(Theme.Light);
  });

  it('should use light theme as default theme setting', () => {
    const {instance} = shallow.createService();
    expect(instance['defaultThemeSetting']).toBe(ThemeSetting.Auto);
  });

  it('should return light theme with light setting', () => {
    const {instance} = shallow.createService();
    expect(instance['getThemeForSetting'](ThemeSetting.Light)).toBe(Theme.Light);
  });

  it('should emit theme after theme is set', () => {
    const {instance} = shallow.createService();
    let theme: Theme;

    instance.currentTheme.subscribe(currentTheme => {
      theme = currentTheme;
    });

    instance.setThemeSetting(ThemeSetting.Light);

    expect(theme).toBe(Theme.Light);

    instance.setThemeSetting(ThemeSetting.Dark);

    expect(theme).toBe(Theme.Dark);
  });

  it('should save selected theme setting to local storage', () => {
    const {instance} = shallow.createService();

    const localStorageKey = instance['localStorageKey'];

    instance['saveThemeSetting'](ThemeSetting.Auto);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Auto);

    instance['saveThemeSetting'](ThemeSetting.Light);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Light);

    instance['saveThemeSetting'](ThemeSetting.Dark);

    expect(localStorage.getItem(localStorageKey)).toBe(ThemeSetting.Dark);
  });
});
