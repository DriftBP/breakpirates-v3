import { Injectable } from '@angular/core';

import { AppSettings } from '../../app-settings';
import { Site } from './site';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  public getSocialSites(): Site[] {
    return [
      {
        Name: 'Facebook',
        Url: AppSettings.FACEBOOK_URL,
        Description: 'Find us on Facebook',
        Icon: 'facebook'
      },
      {
        Name: 'Twitter',
        Url: AppSettings.TWITTER_URL,
        Description: 'Follow us on Twitter',
        Icon: 'twitter'
      },
      {
        Name: 'Mixcloud',
        Url: AppSettings.MIXCLOUD_URL,
        Description: 'Listen again on Mixcloud',
        Icon: 'mixcloud'
      }
    ];
  }
}
