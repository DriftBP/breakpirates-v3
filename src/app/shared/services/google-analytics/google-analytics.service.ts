import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public trackPageHit(path: string) {
    setTimeout(() => {
      gtag('event', 'page_view', {
        page_path: path
      });
    }, 1000);
  }

  public trackEvent(
    eventName: string,
    eventCategory: string,
    eventLabel: string,
    eventValue: number | null = null) {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue
      });
    }
}
