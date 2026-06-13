import { Component, ElementRef, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
    selector: 'bp-donate',
    templateUrl: './donate.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      TranslatePipe
    ]
})
export class DonateComponent {
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);

  donateFormElement = viewChild.required<ElementRef>('donateForm');

  onSubmit() {
    this.googleAnalyticsService.trackEvent('click', 'Donate button', 'Side bar');
  }
}
