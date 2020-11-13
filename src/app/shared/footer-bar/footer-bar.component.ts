import { Component } from '@angular/core';

import { Site } from '../services/social/site';
import { SocialService } from '../services/social/social.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent {
  socialSites: Site[];
  assetRoot = AppSettings.ASSET_ROOT;

  constructor(
    private readonly socialService: SocialService
  ) {
    this.socialSites = this.socialService.getSocialSites();
  }

}
