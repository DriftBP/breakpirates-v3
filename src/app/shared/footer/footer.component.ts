import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemeSelectComponent } from '../theme-select/theme-select.component';

@Component({
    selector: 'bp-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      ThemeSelectComponent,
      TranslatePipe
    ]
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

}
