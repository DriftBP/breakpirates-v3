import { Component } from '@angular/core';

import { ThemeService } from '../services/theme.service';
import { ThemeSetting } from '../services/theme-setting';

@Component({
  selector: 'app-footer',
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
    this.themeService.setAndSaveThemeSetting(themeSetting);
  }

}
