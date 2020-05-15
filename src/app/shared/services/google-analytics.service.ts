import { Injectable } from '@angular/core';

import { AppSettings } from '../../app-settings';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public trackPageHit(path: string) {
    gtag('config', AppSettings.GA_PROPERTY_ID, {
      'page_path': path
    });
  }

  public trackEvent(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      gtag('event', eventName, {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            eventValue: eventValue
      });
    }
}
