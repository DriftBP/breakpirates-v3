import { Injectable } from '@angular/core';
import { faFacebook, faMixcloud, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { AppSettings } from '../../app-settings';
import { Site } from './site';

@Injectable()
export class SocialService {

  public getSocialSites(): Site[] {
    return [
      {
        Name: 'Facebook',
        Url: AppSettings.FACEBOOK_URL,
        Description: 'Find us on Facebook',
        Icon: faFacebook
      },
      {
        Name: 'Twitter',
        Url: AppSettings.TWITTER_URL,
        Description: 'Follow us on Twitter',
        Icon: faTwitter
      },
      {
        Name: 'Mixcloud',
        Url: AppSettings.MIXCLOUD_URL,
        Description: 'Listen again on Mixcloud',
        Icon: faMixcloud
      }
    ];
  }
}
