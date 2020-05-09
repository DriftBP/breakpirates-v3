import { Component, OnInit } from '@angular/core';

import { Site } from '../services/site';
import { SocialService } from '../services/social.service';
import { AppSettings } from '../../appSettings';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  archiveUrl: string;
  isCollapsed: boolean;
  socialSites: Site[];

  constructor(
    private readonly socialService: SocialService
  ) {
    this.socialSites = this.socialService.getSocialSites();
  }

  ngOnInit() {
    this.archiveUrl = AppSettings.ARCHIVE_URL;
    this.isCollapsed = true;
  }

}
