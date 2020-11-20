import { Injectable } from '@angular/core';

import { AppSettings } from '../../../app-settings';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public trackPageHit(path: string) {
    gtag('config', AppSettings.GA_PROPERTY_ID, {
      page_path: path
    });
  }

  public trackEvent(
    eventName: string,
    eventCategory: string,
    eventLabel: string,
    eventValue: number = null) {
      gtag('event', eventName, {
           'event_category': eventCategory,
           'event_label': eventLabel,
           'value': eventValue
      });
    }
}
