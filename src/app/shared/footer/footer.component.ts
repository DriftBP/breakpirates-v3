import { Component } from '@angular/core';

import { ThemeService } from '../services/theme/theme.service';
import { ThemeSetting } from '../services/theme/theme-setting';

@Component({
  selector: 'bp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  themeSettings = ThemeSetting;
  currentYear: number;

  constructor(
    private themeService: ThemeService
  ) {
    this.currentYear = new Date().getFullYear();
  }

  setThemeSetting(themeSetting: ThemeSetting) {
    this.themeService.setThemeSetting(themeSetting);
  }

}
