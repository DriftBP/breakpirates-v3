import { Component } from '@angular/core';

import { SocialService } from '../services/social.service';
import { Site } from '../services/site';

@Component({
  selector: 'app-social-links',
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
