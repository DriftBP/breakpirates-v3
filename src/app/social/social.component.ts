import { Component } from '@angular/core';

import { Site } from '../shared/services/site';
import { SocialService } from '../shared/services/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {
  socialSites: Site[];

  constructor(private readonly socialService: SocialService) {
    this.socialSites = this.socialService.getSocialSites();
  }

}
