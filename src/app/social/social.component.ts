import { Component } from '@angular/core';

import { Site } from '../shared/services/site';
import { SocialService } from '../shared/services/social.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { homeConfigInactive, socialConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html'
})
export class SocialComponent {
  socialSites: Site[];
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    homeConfigInactive,
    socialConfigActive
  ];

  constructor(private readonly socialService: SocialService) {
    this.socialSites = this.socialService.getSocialSites();
  }

}
