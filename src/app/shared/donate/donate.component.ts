import { Component, ElementRef, viewChild } from '@angular/core';

import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-donate',
  templateUrl: './donate.component.html'
})
export class DonateComponent {
  donateFormElement = viewChild.required<ElementRef>('donateForm');

  constructor(
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {}

  onSubmit() {
    this.googleAnalyticsService.trackEvent('click', 'Donate button', 'Side bar');
  }
}
