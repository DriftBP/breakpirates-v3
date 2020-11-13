import { Component } from '@angular/core';

import { SocialService } from '../services/social/social.service';
import { Site } from '../services/social/site';

@Component({
  selector: 'bp-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
  socialSites: Site[];

  constructor(
    private readonly socialService: SocialService
  ) {
    this.socialSites = this.socialService.getSocialSites();
  }

}
