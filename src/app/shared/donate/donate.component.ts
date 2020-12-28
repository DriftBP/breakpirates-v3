import { Component, ElementRef, ViewChild } from '@angular/core';

import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-donate',
  templateUrl: './donate.component.html'
})
export class DonateComponent {
  @ViewChild('donateForm') donateFormElement: ElementRef;

  constructor(
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {}

  onSubmit() {
    this.googleAnalyticsService.trackEvent('click', 'Donate button', 'Side bar');
  }
}
