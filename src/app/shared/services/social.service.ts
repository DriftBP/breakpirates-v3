import { Injectable } from '@angular/core';

import { AppSettings } from '../../appSettings';
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
        Icon: 'facebook'
      },
      {
        Name: 'Twitter',
        Url: AppSettings.TWITTER_URL,
        Icon: 'twitter'
      },
      {
        Name: 'Mixcloud',
        Url: AppSettings.MIXCLOUD_URL,
        Icon: 'mixcloud'
      }
    ];
  }
}
