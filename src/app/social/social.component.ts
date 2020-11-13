import { Component } from '@angular/core';

import { Site } from '../shared/services/social/site';
import { SocialService } from '../shared/services/social/social.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-social',
  templateUrl: './social.component.html'
})
export class SocialComponent {
  socialSites: Site[];
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    socialConfigActive
  ];

  constructor(private readonly socialService: SocialService) {
    this.socialSites = this.socialService.getSocialSites();
  }

}
