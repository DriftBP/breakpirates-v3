import { Component } from '@angular/core';

import { ThemeService } from '../services/theme.service';
import { Theme } from '../services/theme';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  themes = Theme;
  currentYear: number;

  constructor(
    private themeService: ThemeService
  ) {
    this.currentYear = new Date().getFullYear();
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

}
