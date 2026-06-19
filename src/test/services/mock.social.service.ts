import { Injectable } from '@angular/core';

import { Site } from '../../app/social/services/site';

@Injectable()
export class MockSocialService {
  public getSocialSites(): Site[] {
    return [];
  }
}
