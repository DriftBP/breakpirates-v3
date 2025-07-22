import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Site } from './services/site';
import { SocialService } from './services/social.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'bp-social',
    templateUrl: './social.component.html',
    imports: [
      TranslatePipe
    ]
})
export default class SocialComponent implements OnInit {
  private readonly socialService = inject(SocialService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    socialConfigActive
  ];

  socialSites: Site[];

  constructor() {
    this.socialSites = this.socialService.getSocialSites();
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
