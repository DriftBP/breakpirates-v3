import { Component, OnInit } from '@angular/core';

import { TuneInService } from '../../tune-in/tune-in.service';
import { Site } from '../services/site';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  socialSites: Site[];

  constructor(
    private readonly tuneInService: TuneInService,
    private readonly socialService: SocialService
  ) {
    this.socialSites = this.socialService.getSocialSites();
  }

  archiveUrl: string;
  isCollapsed: boolean;

  ngOnInit() {
    this.archiveUrl = this.tuneInService.archiveUrl;
    this.isCollapsed = true;
  }

}
